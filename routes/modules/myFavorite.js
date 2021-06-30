// Route: Render favorite html
app.get('/myFavorite', (req, res) => {
  const favRestaurants = restaurants.results.filter(restaurant => {
    return favorites.includes(restaurant.id)
  })
  res.render('index', { restaurants: favRestaurants })
})