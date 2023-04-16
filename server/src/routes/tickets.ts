import { tickets } from 'controllers';
import express, { Request, Response } from 'express';
import { verifyAccessToken } from 'middlewares';
import { TicketSchema } from 'models';

const router = express.Router();

router.get('/', verifyAccessToken, tickets.getTicket);
// router.get('/', tickets.getTicket);

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const ticket = await TicketSchema.find({ _id: req.params.id });
    res.json(ticket);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
    res.status(500).json({ message: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const ticket = new TicketSchema({
    categoryId: req.body?.categoryId,
    userId: req.body?.userId,
    engineerId: req.body?.engineerId,
    priority: req.body?.priority,
    title: req.body?.title,
    estTime: req.body?.estTime,
    endDate: req.body?.endDate,
    attachments: req.body?.attachment,
  });

  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ message: error.message });
    res.status(400).json({ message: error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await TicketSchema.deleteOne({ _id: req.params.id });
    res.json({ message: `Deleted ticket ${req.params.id}` });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
    res.status(500).json({ message: error });
  }
});
export const ticketsRouter = router;
