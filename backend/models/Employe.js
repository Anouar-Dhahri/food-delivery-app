import mongoose from 'mongoose'

const EmployeSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  state: {
    type: String,
    required: true,
  },
  restaurantId: {
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
})

const Employe = mongoose.model('Employe', EmployeSchema)

export { Employe }