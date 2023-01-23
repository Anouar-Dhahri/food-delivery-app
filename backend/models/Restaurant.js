import mongoose from "mongoose"

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', RestaurantSchema )

export { Restaurant }