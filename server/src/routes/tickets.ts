import { tickets } from 'controllers';
import express from 'express';
import { uploadFile } from 'middlewares';
import { verifyRole } from 'middlewares/verify-role';

const router = express.Router();

router.get('/', verifyRole(['user', 'engineer', 'admin']), tickets.getAllTickets);
router.get('/filters', verifyRole(['user', 'engineer', 'admin']), tickets.getTicketFilters);

router.get('/:id', verifyRole(['user', 'engineer', 'admin']), tickets.getOneTicket);

router.post(
  '/',
  verifyRole(['user', 'engineer', 'admin']),
  uploadFile({ apiKeyName: 'attachments' }),
  tickets.createTicket
);

router.delete('/:id', verifyRole(['admin']), tickets.deleteTicket);
router.patch('/:id', verifyRole(['engineer', 'admin']), tickets.updateTicket);

export const ticketsRouter = router;
