import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plainPassword:{
    type: String,
    default: ""
  }
}, { timestamps: true });

const Client = mongoose.model('Client', ClientSchema);

export { Client }