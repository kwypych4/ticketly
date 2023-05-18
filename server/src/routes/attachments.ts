import { attachments } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/:path', attachments.getAttachments);

export const attachmentsRouter = router;
