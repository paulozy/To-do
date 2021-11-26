const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearchTodo = document.querySelector('.form-search')

const validateInput = inputValue => {

  if(inputValue) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center bg-light">
      <span>${inputValue}</span>
      <i class="fas fa-times delete"></i>
    </li>
  `
  }
}

const addTodo = e => {
  e.preventDefault()

  const inputValue = e.target.add.value.trim()
  validateInput(inputValue)
  e.target.reset()
}

const removeTodo = e => {
  const clickedElement = e.target
  const clickedElementClassList = Array.from(clickedElement.classList)
  const clickedElementParent = clickedElement.parentElement

  if(clickedElementClassList.includes('delete')) {
    clickedElementParent.remove()
  }

}

const filterTodos = (todos, inputValue) => {

  const filteredTodos = todos
    .filter(todo => !todo.textContent.includes(inputValue))

  const notFilteredTodos = todos
    .filter(todo => todo.textContent.includes(inputValue))
  
    filteredTodos.forEach(({ classList }) => {
      classList.add('hidden')
      classList.remove('d-flex')
    })

    notFilteredTodos.forEach(({ classList }) => {
      classList.add('d-flex')
      classList.remove('hidden')
    })
}

const searchTodo = e => {
  e.preventDefault()

  const inputValue = e.target.value.trim()
  const todos = Array.from(todosContainer.children)
  filterTodos(todos, inputValue)
}

formAddTodo.addEventListener('submit', addTodo)

todosContainer.addEventListener('click', removeTodo)

formSearchTodo.addEventListener('input', searchTodo)