import { HttpError } from 'error';
import { Request } from 'express';
import { TicketSchema } from 'models';
import { TicketType } from 'types';
import { errorHandler } from 'utils';

const getTicket = errorHandler(async (_, __) => {
  const ticket = await TicketSchema.find();

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
    endDate: ticket.endDate,
    engineerId: ticket.engineerId,
    estTime: ticket.estTime,
    owner: ticket.owner,
    priority: ticket.priority,
    title: ticket.title,
    startDate: ticket.startDate,
  };
});

type CreateTicketRequest = {
  body: TicketType;
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
    endDate: req.body?.endDate,
  });

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

export const tickets = {
  getTicket,
  createTicket,
  getOneTicket,
  deleteTicket,
};
