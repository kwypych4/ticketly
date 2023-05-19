import { ticketStatus } from 'data/ticket-status.data';
import { HttpError } from 'error';
import { Request } from 'express';
import fileUpload from 'express-fileupload';
import { TicketSchema, UserSchema } from 'models';
import moment from 'moment';
import { AttachmentType, ResponseWithPagination, StatusType, TicketType, UserIdType, UserType } from 'types';
import { errorHandler, slugify } from 'utils';

type TicketsRequest = {
  query: {
    created_date?: [number, number];
    finished_date?: [number, number];
    updated_date?: [number, number];
    owner: UserIdType;
    engineer: UserIdType;
    category_id: number;
    priority: number;
    title: string;
  };
} & Request;

type TicketsResponse = ResponseWithPagination<
  {
    id: string | undefined;
    ownerId: UserIdType;
    ownerName: string;
    title: string;
    engineerId: UserIdType;
    engineer: string;
    timeSpent: number | undefined;
    status: StatusType;
    created: number | undefined;
    updated: number | undefined;
    finished: number | undefined;
  }[]
>;

const getAllTickets = errorHandler<TicketsRequest, TicketsResponse>(async (req, _) => {
  const limit = Number(req.query.limit) || 25;
  const page = Number(req.query.page) || 1;
  const totalElements = await TicketSchema.countDocuments({});
  const {
    owner,
    engineer,
    category_id: categoryId,
    priority,
    title,
    created_date: createdDate,
    updated_date: updatedDate,
    finished_date: finishedDate,
  } = req.query;

  const displayRestrictedData = req.role === 'user';

  const queryCondition = {
    ...(createdDate && {
      created: {
        $gte: moment.unix(createdDate[0]).toISOString(),
        $lt: moment.unix(createdDate[1]).toISOString(),
      },
    }),
    ...(updatedDate && {
      updated: {
        $gte: moment.unix(updatedDate[0]).toISOString(),
        $lt: moment.unix(updatedDate[1]).toISOString(),
      },
    }),
    ...(finishedDate && {
      finished: {
        $gte: moment.unix(finishedDate[0]).toISOString(),
        $lt: moment.unix(finishedDate[1]).toISOString(),
      },
    }),
    ...(displayRestrictedData ? { owner: req.session.userId } : owner && { owner }),
    ...(engineer && { engineer }),
    ...(priority && { priority }),
    ...(categoryId && { categoryId }),
    ...(title && { $text: { $search: title } }),
  };

  const tickets = await TicketSchema.find<TicketType>(queryCondition)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ created: 'desc' });

  const data = tickets
    ? await Promise.all(
        tickets.map(
          async ({ _id, owner, ownerName, engineerId, title, timeSpent, status, created, updated, finished }) => {
            const assignedEngineer = engineerId && (await UserSchema.findOne<UserType>({ _id: engineerId }));

            return {
              id: _id?.toString(),
              ownerId: owner,
              ownerName,
              title,
              engineerId,
              ...(engineerId && { engineer: `${assignedEngineer?.firstName} ${assignedEngineer?.lastName}` }),
              timeSpent,
              status,
              created,
              updated,
              finished,
            };
          }
        )
      )
    : [];

  return {
    pagination: {
      totalElements,
      limit,
      page,
    },
    data,
  };
});

type TicketFiltersRequest = {
  query: {
    distinct: 'true' | 'false';
  };
} & Request;

type TicketFiltersResponse = {
  statuses: {
    label: string;
    value: string;
  }[];
  engineers: {
    label: string;
    value: string;
  }[];
};

const getTicketFilters = errorHandler<TicketFiltersRequest, TicketFiltersResponse>(async (req, __) => {
  const statusesDistinct = await Promise.all(
    (
      await TicketSchema.distinct('status')
    ).map(async (status: string) => {
      const returnObject = {
        label: status,
        value: status,
      };
      return returnObject;
    })
  );

  const engineersDistinct = await Promise.all(
    (
      await TicketSchema.distinct('engineerId')
    ).map(async (id) => {
      const assignedEngineer = await UserSchema.findOne<UserType>({ _id: id });

      const returnObject = {
        label: `${assignedEngineer?.firstName} ${assignedEngineer?.lastName}`,
        value: id,
      };
      return returnObject;
    })
  );

  const statuses = ticketStatus.map((status: string) => ({
    label: `${status[0].toLocaleUpperCase()}${status.slice(1)}`,
    value: status,
  }));

  const engineers = (await UserSchema.find<UserType>({ role: 'engineer' })).map(({ _id, firstName, lastName }) => ({
    label: `${firstName} ${lastName}`,
    value: _id ? _id.toString() : '22',
  }));
  return {
    ...(req.query.distinct === 'true'
      ? { statuses: statusesDistinct, engineers: engineersDistinct }
      : { statuses, engineers }),
  };
});

type OneTicketRequest = Request;

type OneTicketResponse = TicketType;

const getOneTicket = errorHandler<OneTicketRequest, OneTicketResponse>(async (req, _) => {
  const ticket = await TicketSchema.findOne<TicketType>({ _id: req.params.id });

  if (!ticket) throw new HttpError(400, 'Ticket not found');

  const engineer = ticket.engineerId && (await UserSchema.findOne<UserType>({ _id: ticket.engineerId }));
  return {
    categoryId: ticket.categoryId,
    finished: ticket.finished,
    created: ticket.created,
    updated: ticket.updated,
    engineerId: ticket.engineerId,
    ...(engineer && { engineerName: `${engineer?.firstName} ${engineer?.lastName}` }),
    estTime: ticket.estTime,
    owner: ticket.owner,
    ownerName: ticket.ownerName,
    priority: ticket.priority,
    title: ticket.title,
    description: ticket.description,
    timeSpent: ticket.timeSpent,
    ...(ticket.attachments && ticket.attachments.length > 0 && { attachments: ticket.attachments }),
    status: ticket.status,
  };
});

type CreateTicketRequest = {
  body: Omit<TicketType, 'attachments'>;
} & Request;

type CreateTicketResponse = {
  success: boolean;
};

const createTicket = errorHandler<CreateTicketRequest, CreateTicketResponse>(async (req, _) => {
  const userDocument = await UserSchema.findOne<UserType>({ _id: req.session?.userId });

  const ticket = new TicketSchema({
    categoryId: req.body?.categoryId,
    owner: req.session?.userId,
    ...(userDocument && { ownerName: `${userDocument.firstName} ${userDocument.lastName}` }),
    priority: req.body?.priority,
    title: req.body?.title,
    description: req.body?.description,
    estTime: req.body?.estTime,
    status: req.body?.status,
  });

  if (req.files) {
    if ((req.files.attachments as fileUpload.UploadedFile[]).length > 1) {
      const files = req.files.attachments as fileUpload.UploadedFile[];
      const names: AttachmentType = [];

      files.map((file) =>
        names.push({
          type: file.mimetype,
          path: file.md5 + file.size + slugify(file.name),
          title: file.name,
        })
      );

      ticket.attachments = names;
    } else {
      const file = req.files.attachments as fileUpload.UploadedFile;

      ticket.attachments = [{ type: file.mimetype, path: file.md5 + file.size + slugify(file.name), title: file.name }];
    }
  }

  await ticket.save();

  return { success: true };
});

type DeleteTicketRequest = Request;

type DeleteTicketResponse = { success: boolean };

const deleteTicket = errorHandler<DeleteTicketRequest, DeleteTicketResponse>(async (req, _) => {
  await TicketSchema.deleteOne({ _id: req.params.id });

  return {
    success: true,
  };
});

type UpdateTicketRequest = {
  body: {
    engineer: UserIdType;
    category_id: number;
    priority: number;
    timeSpent: number;
    status: StatusType;
  };
} & Request;

type UpdateTicketResponse = { success: boolean };

const updateTicket = errorHandler<UpdateTicketRequest, UpdateTicketResponse>(async (req, _) => {
  const { engineer, category_id: categoryId, priority, timeSpent, status } = req.body;

  if (status && !ticketStatus.includes(status))
    throw new HttpError(500, `The ticket can only have 'new' or 'in progress' or 'blocked' or 'finished' status.`);

  const updateParams = {
    $set: {
      updated: moment().toISOString(),
      ...(status === 'finished' && { finished: moment().toISOString() }),
      ...(engineer && { engineerId: engineer }),
      ...(categoryId && { categoryId }),
      ...(priority && { priority }),
      ...(timeSpent && { timeSpent }),
      ...(status && { status }),
    },
  };

  const ticket = await TicketSchema.updateOne<TicketType>({ _id: req.params.id }, updateParams);

  if (!ticket) throw new HttpError(404, 'Ticket not found');

  return {
    success: true,
  };
});

export const tickets = {
  getAllTickets,
  getTicketFilters,
  createTicket,
  getOneTicket,
  deleteTicket,
  updateTicket,
};
