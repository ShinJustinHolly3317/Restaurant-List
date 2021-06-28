// Element variables
const addBtn = document.querySelector('.restaurant-cards')
const deleteBtn = document.querySelector('.card-img-top')


// Main function 


// Functions 
function addFav (id) {
  localStorage.setItem('favoriteRestaurant', id)
  console.log('hehehe!!')
}

// Listeners
addBtn.addEventListener('click', (e) => {
  let id = Number(e.target.dataset.id)
  if (e.target.classList.contains('btn-delete')){
    console.log('alert')
  }
})


