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

const sessionSchema = new mongoose.Schema({
  id_device: String,
  id_user: String,
  session_state: String,    //open or closed
  date: Date,
});

const contactSchema = new mongoose.Schema({
  contact: String,
});




const Contact = mongoose.model('Contact', contactSchema);
const Session = mongoose.model('Session', sessionSchema);
const User = mongoose.model('User', userSchema);

export const models = { Contact, Session, User };
