// Element variables
const addBtn = document.querySelector('.restaurant-cards')
const modalBtn = document.querySelector('.yesToDelete')

// Functions 
function changeAction (id) {
  modalBtn.action = `/restaurant/${id}/?_method=DELETE`
}

// Listeners
addBtn.addEventListener('click', (e) => {
  let id = e.target.dataset.id
  if (e.target.classList.contains('btn-delete')){
    changeAction(id)
  }
})
