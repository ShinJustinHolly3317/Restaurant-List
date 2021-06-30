/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

const ascSort = ['rating', 'nameZ']

// Route(by MongoDB): Html Get response from partial template by MongoDB
router.get('/', (req, res) => {
  const sortBy = req.query ? req.query.sortBy : "_id"
  RestaurantDb.find()
    .lean()
    .sort({ [sortBy]: ascSort.includes(sortBy) ? 'desc' : 'asc' })
    .then(restaurants => res.render('index', { restaurants, sortBy }))
})


module.exports = router