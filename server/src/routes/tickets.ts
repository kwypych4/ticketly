import { tickets } from 'controllers';
import express from 'express';
import { uploadFile } from 'middlewares';

const router = express.Router();

router.get('/', tickets.getTicket);

router.get('/:id', tickets.getOneTicket);

router.post('/', uploadFile({ apiKeyName: 'attachments' }), tickets.createTicket);

router.delete('/:id', tickets.deleteTicket);
router.patch('/:id', tickets.updateTicket);
export const ticketsRouter = router;
