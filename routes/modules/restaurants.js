/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

// Route(by MongoDB): Html Get response from restaurant details
router.get('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  return RestaurantDb.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Route: Delete info by RESTful method
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantDb.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Route: Render edit page
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  return RestaurantDb.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// Route: update edit onfo by RESTful method
router.put('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantDb.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})


module.exports = router