import mongoose from 'mongoose';

export const role = new mongoose.Schema({
  name: { type: String, required: true },
});

export const RoleSchema = mongoose.model('Role', role);
