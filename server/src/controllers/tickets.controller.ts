import { HttpError } from 'error';
import { Request } from 'express';
import fileUpload from 'express-fileupload';
import { TicketSchema } from 'models';
import moment from 'moment';
import { AttachmentType, TicketType, UserIdType } from 'types';
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

type TicketsResponse = TicketType[];

const getTicket = errorHandler<TicketsRequest, TicketsResponse>(async (req, _) => {
  const limit = Number(req.query.limit) || 25;
  const page = Number(req.query.page) || 1;
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

  const ticket = await TicketSchema.find(queryCondition)
    .limit(limit)
    .skip((page - 1) * limit);

  if (!ticket) throw new HttpError(400, 'Ticket not found');
  return ticket;
});

type OneTicketRequest = Request;

type OneTicketResponse = TicketType;

const getOneTicket = errorHandler<OneTicketRequest, OneTicketResponse>(async (req, _) => {
  const ticket = await TicketSchema.findOne<TicketType>({ _id: req.params.id });

  if (!ticket) throw new HttpError(400, 'Ticket not found');
  return {
    categoryId: ticket.categoryId,
    finished: ticket.finished,
    created: ticket.created,
    updated: ticket.updated,
    engineerId: ticket.engineerId,
    estTime: ticket.estTime,
    owner: ticket.owner,
    priority: ticket.priority,
    title: ticket.title,
    attachments: ticket.attachments,
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
  });

  if (req.files) {
    if ((req.files.attachments as fileUpload.UploadedFile[]).length > 1) {
      const files = req.files.attachments as fileUpload.UploadedFile[];
      const names: AttachmentType = [];

      files.map((file) =>
        names.push({
          type: file.mimetype,
          path: `/attachments/${file.md5 + file.size + slugify(file.name)}`,
        })
      );

      ticket.attachments = names;
    } else {
      const file = req.files.attachments as fileUpload.UploadedFile;

      ticket.attachments = [{ type: file.mimetype, path: `/attachments/${file.md5 + file.size + slugify(file.name)}` }];
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
  };
} & Request;

type UpdateTicketResponse = { success: boolean };

const updateTicket = errorHandler<UpdateTicketRequest, UpdateTicketResponse>(async (req, _) => {
  const { engineer, category_id: categoryId, priority } = req.body;

  const updateParams = {
    $set: {
      updated: moment().toISOString(),
      ...(engineer && { engineerId: engineer }),
      ...(categoryId && { categoryId }),
      ...(priority && { priority }),
    },
  };

  const ticket = await TicketSchema.updateOne<TicketType>({ _id: req.params.id }, updateParams);

  if (!ticket) throw new HttpError(400, 'Ticket not found');

  return {
    success: true,
  };
});

export const tickets = {
  getTicket,
  createTicket,
  getOneTicket,
  deleteTicket,
  updateTicket,
};
