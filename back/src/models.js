import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id_contact: String,
  id_session: String,
  name: String,
  username: String,
  password: String,
  register_date: Date,
  type: String, //admin or user
});


const User = mongoose.model('User', userSchema);

export const models = { User };
