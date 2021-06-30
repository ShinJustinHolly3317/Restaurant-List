/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const RestaurantDb = require('../../model/restaurantInfo')

// Route: Render adding page
router.get('/', (req, res) => {
  res.render('newlyadd')
})

// Route: Send info to MongoDB by POST method
router.post('/', (req, res) => {
  const info = req.body
  return RestaurantDb.create({
    name: info.name,
    name_en: info.name_en,
    category: info.category,
    image: info.image,
    location: info.location,
    phone: info.phone,
    google_map: info.google_map,
    rating: info.rating,
    description: info.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error)) // 這邊加reutrn 目的是為了讓這個post動作可以提早結束
})

module.exports = router