const inputElement = document.querySelector('.newTask')
const buttonElement = document.querySelector('.addTask')
const tasksContainer = document.querySelector('.tasks-container')

const validateInput = () => {
  return inputElement.value.trim().length > 0
}

const handleAddTask = () => {
  const inputIsValid = validateInput()

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }

  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  const taskText = document.createElement('p')
  taskText.innerText = inputElement.value

  const completeTask = document.createElement('i')
  completeTask.classList.add('fa')
  completeTask.classList.add('fa-check-circle-o')
  completeTask.classList.add('fa-2x')

  completeTask.addEventListener('click', () => handleClick(completeTask))

  const deleteItem = document.createElement('i')
  deleteItem.classList.add('fa')
  deleteItem.classList.add('fa-trash')
  deleteItem.classList.add('fa-2x')

  deleteItem.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskText)
  )

  tasksContainer.appendChild(taskItemContainer)

  taskItemContainer.appendChild(completeTask)
  taskItemContainer.appendChild(taskText)
  taskItemContainer.appendChild(deleteItem)

  inputElement.value = ''

  uploadLocalStorage()
}

const handleClick = completeTask => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    if (task.firstChild.isSameNode(completeTask)) {
      task.firstChild.classList.toggle('completed')
    }
  }
  uploadLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskText) => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    if (task.hasChildNodes(taskText)) {
      taskItemContainer.remove()
    }
  }
  uploadLocalStorage()
}

const handleInputChange = () => {
  const inputIsValid = validateInput()

  if (inputIsValid) {
    return inputElement.classList.remove('error')
  }
}

const uploadLocalStorage = () => {
  const tasks = tasksContainer.childNodes

  const localStorageTasks = [...tasks].map(task => {
    const content = task
    const isCompleted = content.firstChild.classList.contains('completed')

    return { description: content.innerText, isCompleted }
  })

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasksLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

  if (!tasksFromLocalStorage) return

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const completeTask = document.createElement('i')

    const taskText = document.createElement('p')
    taskText.innerText = task.description
    if (task.isCompleted) {
      completeTask.classList.add('completed')
    }

    completeTask.classList.add('fa')
    completeTask.classList.add('fa-check-circle-o')
    completeTask.classList.add('fa-2x')

    completeTask.addEventListener('click', () => handleClick(completeTask))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa')
    deleteItem.classList.add('fa-trash')
    deleteItem.classList.add('fa-2x')

    deleteItem.addEventListener('click', () =>
      handleDeleteClick(taskItemContainer, taskText)
    )

    tasksContainer.appendChild(taskItemContainer)

    taskItemContainer.appendChild(completeTask)
    taskItemContainer.appendChild(taskText)
    taskItemContainer.appendChild(deleteItem)
  }
}

refreshTasksLocalStorage()

buttonElement.addEventListener('click', () => handleAddTask())
inputElement.addEventListener('change', () => handleInputChange())
