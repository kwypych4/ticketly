import { comments, tickets } from 'controllers';
import express from 'express';
import { uploadFile } from 'middlewares';

const router = express.Router();

router.get('/', tickets.getAllTickets);
router.get('/filters', tickets.getTicketFilters);

router.get('/:id', tickets.getOneTicket);

router.post('/', uploadFile({ apiKeyName: 'attachments' }), tickets.createTicket);

router.delete('/:id', tickets.deleteTicket);
router.patch('/:id', tickets.updateTicket);

router.get('/:ticketId/comments', comments.getComments);
router.post('/:ticketId/comments', uploadFile({ apiKeyName: 'attachments' }), comments.createComment);

export const ticketsRouter = router;
