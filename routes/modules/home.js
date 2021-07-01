/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

const descSort = ['ratingDesc', 'nameDesc']

// Route(by MongoDB): Html Get response from partial template by MongoDB
router.get('/', (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  const chosenCategory = req.query.category ? req.query.category : ""
  RestaurantDb.find()
    .lean()
    .sort({ [sortBy.includes('rating') ? 'rating' : 'name']: descSort.includes(sortBy) ? 'desc' : 'asc' })
    .then(restaurants => {
      let filterRestaurants = restaurants.filter(restaurant => restaurant.category.includes(chosenCategory))
      res.render('index', { restaurants: filterRestaurants, sortBy, category: chosenCategory })
    })
})


module.exports = router