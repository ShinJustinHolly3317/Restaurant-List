/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

// Route: Create Search Bar function
router.get('/search', (req, res) => {
  const keyword = req.query.restaurant.toLowerCase().trim()
  RestaurantDb.find()
  .lean()
  .then(restaurants => {
    const searchRestaurants = restaurants.filter(restaurant => {
      // Collect search results in a object in case more than 2 searching keywords
      const searchTure = {
        name: restaurant.name.toLowerCase().includes(keyword),
        category: restaurant.category.toLowerCase().includes(keyword)
      }
      return Object.values(searchTure).includes(true)
    })
    res.render('index', { restaurants: searchRestaurants, keyword })
  })
})


module.exports = router