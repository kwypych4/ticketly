import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

type GetAttachmentsRequest = {
  params: {
    path: string;
  };
} & Request;

const getAttachments = async (req: GetAttachmentsRequest, res: Response) => {
  const filePath = `${path.join(process.cwd(), 'src')}/attachments/${req.params.path}`;

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send({ error: 'File not found' });
};

export const attachments = {
  getAttachments,
};
