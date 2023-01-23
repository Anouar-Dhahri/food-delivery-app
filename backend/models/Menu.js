import mongoose from "mongoose"

const MenuSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  restaurantId: {
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
}, { timestamps: true })

const Menu = mongoose.model('Menu', MenuSchema)

export { Menu }