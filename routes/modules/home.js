/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

// Route(by MongoDB): Html Get response from partial template by MongoDB
router.get('/', (req, res) => {
  RestaurantDb.find()
    .lean()
    .sort({ rating: 'desc'})
    .then(restaurants => res.render('index', { restaurants }))
})


module.exports = router