import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { Ticket } from 'types';

import { AttachmentSchema } from './attachment';

const ticket = new Schema<Ticket>({
  userId: {
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
  },
  estTime: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Number,
    required: false,
    default: moment().unix(),
  },
  endDate: {
    type: Number,
    required: true,
  },
  // attachments: {
  //   type: AttachmentSchema,
  //   required: false,
  // },
});

export const TicketSchema = mongoose.model('Ticket', ticket);
