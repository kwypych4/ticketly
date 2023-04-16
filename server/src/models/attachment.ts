import { model, Schema } from 'mongoose';
import { AttachmentType } from 'types';

const attachment = new Schema<AttachmentType>({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export const AttachmentSchema = model<AttachmentType>('Attachment', attachment);
