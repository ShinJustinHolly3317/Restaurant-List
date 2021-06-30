/* Require module */
const express = require('express') // Include Express
const restaurants = require('./restaurant.json') // Include JSON data
const mongoose = require('mongoose') // Include mongoose library
const RestaurantDb = require('./model/restaurantInfo.js')

/* Initialzie express */
const app = express()

/* Include static files */
app.use(express.static('public'))

/* Include Express Handlebars */
const exphbs = require('express-handlebars')

/* Setting template engine */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* Setting server variables */
const port = 3000

/* Initialize mongoDB */
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

/* Initialze body parser */
app.use(express.urlencoded({ extended: true }))

/* Settings of method override */
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

/* Settings of router */
const routes = require('./routes')
app.use(routes)

/* Start server and listen */
app.listen(port, () => {
  console.log(`This server is runnig on http://localhost:${port}`)
})
