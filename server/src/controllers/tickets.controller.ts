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
    ...(owner && { owner }),
    ...(engineer && { engineer }),
    ...(priority && { priority }),
    ...(categoryId && { categoryId }),
    ...(title && { $text: { $search: title } }),
  };

  const tickets = await TicketSchema.find<TicketType>(queryCondition)
    .limit(limit)
    .skip((page - 1) * limit);

  if (!tickets) throw new HttpError(400, 'Ticket not found');

  const data = await Promise.all(
    tickets.map(async ({ _id, owner, engineerId, title, timeSpent, status, created, updated, finished }) => {
      const ticketOwner = await UserSchema.findOne<UserType>({ _id: owner });
      const assignedEngineer = await UserSchema.findOne<UserType>({ _id: engineerId });

      return {
        id: _id?.toString(),
        ownerId: owner,
        ownerName: `${ticketOwner?.firstName} ${ticketOwner?.lastName}`,
        title,
        engineerId,
        engineer: `${assignedEngineer?.firstName} ${assignedEngineer?.lastName}`,
        timeSpent,
        status,
        created,
        updated,
        finished,
      };
    })
  );

  return {
    pagination: {
      totalElements,
      limit,
      page,
    },
    data,
  };
});

const getTicketFilters = errorHandler<any, any>(async (req, res) => {
  const statuses = await TicketSchema.distinct<TicketType>('status');
  const engineers = await Promise.all(
    (
      await TicketSchema.distinct('engineerId')
    ).map(async (id) => {
      const assignedEngineer = await UserSchema.findOne<UserType>({ _id: id });

      const returnObject = {
        displayValue: `${assignedEngineer?.firstName} ${assignedEngineer?.lastName}`,
        id,
      };
      return returnObject;
    })
  );
});

type OneTicketRequest = Request;

type OneTicketResponse = TicketType;

const getOneTicket = errorHandler<OneTicketRequest, OneTicketResponse>(async (req, _) => {
  const ticket = await TicketSchema.findOne<TicketType>({ _id: req.params.id });

  if (!ticket) throw new HttpError(400, 'Ticket not found');

  const engineer = await UserSchema.findOne<UserType>({ _id: ticket.engineerId });
  const owner = await UserSchema.findOne<UserType>({ _id: ticket.owner });

  return {
    categoryId: ticket.categoryId,
    finished: ticket.finished,
    created: ticket.created,
    updated: ticket.updated,
    engineerId: ticket.engineerId,
    engineerName: `${engineer?.firstName} ${engineer?.lastName}`,
    estTime: ticket.estTime,
    owner: ticket.owner,
    ownerName: `${owner?.firstName} ${owner?.lastName}`,
    priority: ticket.priority,
    title: ticket.title,
    description: ticket.description,
    timeSpent: ticket.timeSpent,
    attachments: ticket.attachments,
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
  const ticket = new TicketSchema({
    categoryId: req.body?.categoryId,
    owner: req.session?.userId,
    engineerId: req.body?.engineerId,
    priority: req.body?.priority,
    title: req.body?.title,
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
          path: `/attachments/${file.md5 + file.size + slugify(file.name)}`,
          title: file.name,
        })
      );

      ticket.attachments = names;
    } else {
      const file = req.files.attachments as fileUpload.UploadedFile;

      ticket.attachments = [
        { type: file.mimetype, path: `/attachments/${file.md5 + file.size + slugify(file.name)}`, title: file.name },
      ];
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
      ...(engineer && { engineerId: engineer }),
      ...(categoryId && { categoryId }),
      ...(priority && { priority }),
      ...(timeSpent && { timeSpent }),
      ...(status && { status }),
    },
  };

  const ticket = await TicketSchema.updateOne<TicketType>({ _id: req.params.id }, updateParams);

  if (!ticket) throw new HttpError(400, 'Ticket not found');

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
