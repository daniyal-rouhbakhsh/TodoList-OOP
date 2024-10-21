class Todo{
  constructor(id,title){
    this.todoId = id
    this.todoTitle = title
    this.isCompleted = false 
  }
}

class TodoList{
  constructor(){
    this.todos = []
    this.todoInput = document.getElementById("todo-input")
    this.addTodoBtn = document.getElementById('add-todo')
    this.clearTodosBtn = document.getElementById('clear-todo-list')

    this.render()
  }

  render(){
    this.getDataLocalStorage()
    
    this.todoInput.addEventListener('keypress',e => {
      if(e.code == 'Enter' && this.todoInput.value){
        this.addTodo()
      }
    })
    this.addTodoBtn.addEventListener('click',() => {
      if(this.todoInput.value){
        this.addTodo()
      }
    })
    this.clearTodosBtn.addEventListener('click',() => {
      this.clearAllTodos()
    })
    
  }

  getDataLocalStorage(){
    let storedData = JSON.parse(localStorage.getItem('Todos'))

    if(storedData){
      this.todos = storedData.map(todo => {
        let todoData = new Todo(todo.todoId,todo.todoTitle)
        todoData.isCompleted = todo.isCompleted

        return todoData
      })
    }
    else{
      this.todos = []
    }
    this.todoDOMGenerator()
  }

  addTodo(){
    let todoId = Date.now().toString()
    let newTodo = new Todo(todoId,this.todoInput.value)
    this.todos.push(newTodo)
    
    this.todoOperation()
  }
  
  todoOperation(){
    this.todoDOMGenerator()
    this.saveDataToLocalStorage()
    this.clearInput()
  }

  todoDOMGenerator(){
    const todoListContainer = document.querySelector(".todo-items")
    todoListContainer.innerHTML = ''

    this.todos.forEach(todo => {
      let todoItem = document.createElement('div')
      todoItem.className = 'todo-item'

      let todoTitle = document.createElement('h6')
      todoTitle.className = 'todo-title'
      todoItem.innerHTML = todo.todoTitle 

      let todoButtons = document.createElement('div')
      todoButtons.className = 'todo-buttons'
      
      let completeTodoBtn = document.createElement('button')
      completeTodoBtn.id = 'complete-todo'
      completeTodoBtn.innerHTML = 'Complete'
      completeTodoBtn.addEventListener('click',() => {
        this.completeTodo(todo.todoId)
      })

      let removeTodoBtn = document.createElement('button')
      removeTodoBtn.id = 'remove-todo'
      removeTodoBtn.innerHTML = 'Remove'
      removeTodoBtn.addEventListener('click',() => {
        this.removeTodo(todo.todoId)
      })

      todoButtons.append(completeTodoBtn,removeTodoBtn)
      todoItem.append(todoTitle,todoButtons)
      todoListContainer.append(todoItem)

      if(todo.isCompleted){
        todoItem.classList.add('completed')
        completeTodoBtn.innerHTML = 'Completed!'
      }
    })
  }

  saveDataToLocalStorage(){
    localStorage.setItem('Todos',JSON.stringify(this.todos))
  }
  completeTodo(todoId){
    this.todos.forEach(todo => {
      if(todo.todoId == todoId){
        todo.isCompleted = !todo.isCompleted
      }
    })
    this.todoOperation()
  }

  removeTodo(todoId){
    let findIndexTodo = this.todos.findIndex(todo => todo.todoId == todoId)
    this.todos.splice(findIndexTodo,1)

    this.todoOperation()
  }

  clearAllTodos(){
    localStorage.removeItem('Todos')
    this.getDataLocalStorage()
    this.clearInput()
  }

  clearInput(){
    this.todoInput.value = ''
    this.todoInput.focus()
  }
}

new TodoList()
