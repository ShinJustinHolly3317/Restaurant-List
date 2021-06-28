/* Require module */
const express = require('express') // Include Express
const restaurants = require('./restaurant.json') // Include JSON data
const mongoose = require('mongoose') // Include mongoose library
const RestaurantDb = require('./model/restaurantInfo.js')

/* Initialzie express */
const app = express()

/* Include static files */  
app.use(express.static('public'))

/* Global data */
const favorites = [1, 5, 7]

/* Include Express Handlebars */  
const exphbs = require('express-handlebars')
const { ExpressHandlebars } = require('express-handlebars')

/* Setting template engine */  
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* Setting server variables */  
const port = 3000

/* Initialize mongoDB */
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
 
/* Initialze body parser */
app.use(express.urlencoded({ extended: true }))


// Route(by JSON): Html Get response from partial template
// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurants.results })
// })

// Route(by JSON): Html Get response from restaurant details
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   let restaurant_id = Number(req.params.restaurant_id) - 1
//   res.render('show', { restaurant: restaurants.results[restaurant_id] })
// })

// Route(by MongoDB): Html Get response from partial template by MongoDB
app.get('/', (req, res) => {
  RestaurantDb.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
})

// Route(by MongoDB): Html Get response from restaurant details
app.get('/restaurants/:restaurant_id', (req, res) => {
  let restaurant_id = req.params.restaurant_id
  return RestaurantDb.findById(restaurant_id)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => console.log(error))
})

// Route: Create Search Bar function
app.get('/search', (req, res) => {
  const keyword = req.query.restaurant.trim()
  console.log('keyword:', keyword)
  const searchRestaurants = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  // const searchCategory = restaurants.results.filter(restaurant => {
  //   return restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  // })
  // let finalSearch = searchRestaurants.concat(searchCategory)
  res.render('index', { restaurants: searchRestaurants, keyword})
})

// Route: Render favorite html
app.get('/myFavorite', (req, res) => {
  const favRestaurants = restaurants.results.filter(restaurant => {
    return favorites.includes(restaurant.id)
  })
  res.render('index', { restaurants: favRestaurants })
})

// Route: Go to adding restaurnat
app.get('/newlyadd', (req, res) => {
  res.render('newlyadd')
})

// Route: Send info to MongoDB by POST method
app.post('/newlyadd', (req, res) => {
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

// Route: Delete info
app.get('/restaurant/delete/:id', (req, res) => {
  const id = req.params.id
  return RestaurantDb.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// Route: Render edit page
app.get('/restaurant/edit/:id', (req, res) => {
  const id = req.params.id
  return RestaurantDb.findById(id)
  .lean()
  .then(restaurant => res.render('edit', { 
    restaurant,
    helpers: {
      isSelected: function (category1, category2) {
        if (category1 === category2) {
          return 'selected'
        }
      }
    }
  }))
  .catch(error => console.log(error))
})

// Route: update edit onfo
app.post('/restaurant/edit/:id', (req, res) => {
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
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})


/* Start server and listen */
app.listen(port, () => {
  console.log(`This server is runnig on http://localhost:${port}`)
})
