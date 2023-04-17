import { tickets } from 'controllers';
import express, { Request, Response } from 'express';
import { TicketSchema } from 'models';

const router = express.Router();

router.get('/', tickets.getTicket);

router.get('/:id', tickets.getOneTicket);

router.post('/', tickets.createTicket);

router.delete('/:id', tickets.deleteTicket);
export const ticketsRouter = router;
