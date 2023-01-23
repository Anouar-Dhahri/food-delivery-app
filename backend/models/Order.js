import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  clientId: {
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
  items: {
    type: Array,
    default: [],
  },
  restaurantId: {
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
  employeId: {
    type:mongoose.Schema.Types.ObjectId, 
    default: null
  },
  totalPrice: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

export { Order }