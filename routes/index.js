/* Require module */
const express = require('express') // Include Express
/* Initialzie express Router */
const router = express.Router()
const home = require('./modules/home')
const restaurant = require('./modules/restaurants')
const search = require('./modules/search')
const create = require('./modules/create')

// Using modules
router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/', search)
router.use('/newlyadd', create)


module.exports = router

