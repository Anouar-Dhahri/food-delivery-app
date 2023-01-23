import mongoose from "mongoose";
import Double from '@mongoosejs/double'

const ItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Double,
    required: true,
  },
  menuId: {
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
}, { timestamps: true })

const Item = mongoose.model('Item', ItemSchema )

export { Item }