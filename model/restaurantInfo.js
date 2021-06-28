const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: Number, // data type is string
    required: false, // this data is a required input
  },
  name: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  name_en: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  category: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  image: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  location: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  phone: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  google_map: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  rating: {
    type: String, // data type is string
    required: true, // this data is a required input
  },
  description: {
    type: String, // data type is string
    required: true, // this data is a required input
  }
})

// export as module
module.exports = mongoose.model('Restauranttt', restaurantSchema)