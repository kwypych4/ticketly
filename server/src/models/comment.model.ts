import { model, Schema } from 'mongoose';
import { AttachmentSchemaType, CommentType } from 'types';

const comment = new Schema<CommentType>({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: false,
  },
  updated: {
    type: Date,
    required: false,
  },
  attachments: AttachmentSchemaType,
});

export const CommentSchema = model<CommentType>('Comment', comment);
