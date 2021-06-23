// Include Express
const express = require('express')
const app = express()

// Include Express Handlebars
const exphbs = require('express-handlebars')
// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting server variables
const port = 3000

// Include static files
app.use(express.static('public'))

// Include JSON data
const restaurants = require('./restaurant.json') 


// Html Get response from partial template
app.get('/', (req, res) => {
  
  res.render('index', { restaurants: restaurants.results })
})

// Html Get response from restaurant details
app.get('/restaurants/:restaurant_id', (req, res) => {
  let restaurant_id = Number(req.params.restaurant_id) - 1
  res.render('show', { restaurant: restaurants.results[restaurant_id] })
})

// Create Search Bar function
app.get('/search', (req, res) => {
  const keyword = req.query.restaurant
  console.log('keyword:', keyword)
  const searchRestaurants = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  // const searchCategory = restaurants.results.filter(restaurant => {
  //   return restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  // })

  // let finalSearch = searchRestaurants.concat(searchCategory)

  // console.log(finalSearch)
  res.render('index', { restaurants: searchRestaurants, keyword})
})


// Start server and listen
app.listen(port, () => {
  console.log(`This server is runnig on http://localhost:${port}`)
})

