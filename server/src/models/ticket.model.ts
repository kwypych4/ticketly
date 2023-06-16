import { ticketStatus } from 'data/ticket-status.data';
import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { AttachmentSchemaType, TicketType } from 'types';

const ticket = new Schema<TicketType>({
  owner: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: false,
  },
  engineerId: {
    type: String,
    required: false,
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
  description: {
    type: String,
    required: true,
    index: 'text',
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
  status: {
    type: String,
    enum: ticketStatus,
    default: 'new',
    required: true,
  },
});

export const TicketSchema = mongoose.model('Ticket', ticket);
