/* Include mongoose */
const mongoose = require('mongoose') // include mongoose library
const Restauranttt = require('../restaurantInfo.js')
const restaurants = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // connect to MongoDB

/* aquire the status of mongoDB connection */
const db = mongoose.connection
// connection error
db.on('error', () => {
  console.log('MongoDB error!')
})

// connected
db.once('open', () => {
  console.log('MongoDB connected')
  for (let i = 0; i < restaurants.results.length; i++) {
    Restauranttt.create({ 
      id: restaurants.results[i].id,
      name: restaurants.results[i].name,
      name_en: restaurants.results[i].name_en,
      category: restaurants.results[i].category,
      image: restaurants.results[i].image,
      location: restaurants.results[i].location,
      phone: restaurants.results[i].phone,
      google_map: restaurants.results[i].google_map,
      rating: restaurants.results[i].rating,
      description: restaurants.results[i].description,
    })
  }
  console.log('Done.')
})