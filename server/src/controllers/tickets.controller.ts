import { HttpError } from 'error';
import { Request, Response } from 'express';
import { TicketSchema } from 'models';
import { errorHandler } from 'utils';

const getTicket = errorHandler(async (_: Request, __: Response) => {
  const ticket = await TicketSchema.find();

  if (!ticket) throw new HttpError(400, 'Ticket not found');
  return ticket;
});

export const tickets = {
  getTicket,
};
