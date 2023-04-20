import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { AttachmentSchemaType, TicketType } from 'types';

const ticket = new Schema<TicketType>({
  owner: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  engineerId: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: 'text',
  },
  estTime: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: false,
    default: moment().toISOString(),
  },
  updated: {
    type: Date,
    required: false,
    default: moment().toISOString(),
  },
  finished: {
    type: Date,
    required: false,
    default: 0,
  },
  timeSpent: {
    type: Number,
    required: false,
    default: 0,
  },
  attachments: AttachmentSchemaType,
});

export const TicketSchema = mongoose.model('Ticket', ticket);
