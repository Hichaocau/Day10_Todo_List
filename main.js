const form = document.querySelector('form')
const input = document.querySelector('input')
const button = document.querySelector('button')
const todos = document.querySelector('.todos')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    input.value = input.value.trim()

    if(input.value){
        addTodoElement({
            text: input.value
        })
    
        saveTodoList()
    }

    input.value = null
})

function addTodoElement(todo) {
    // create li tag
    var li = document.createElement('li')
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fas fa-trash"></i>
    `

    if(todo.status === 'completed'){
        li.setAttribute('class', 'completed')
    }

    li.addEventListener('click', function(){
        this.classList.toggle('completed')
        saveTodoList()
    })

    // click icon => delete li
    li.querySelector('i').addEventListener('click', function(){
        this.parentElement.remove()
        saveTodoList()
    })

    todos.appendChild(li)
}

// save data to local storage 
function saveTodoList(){
    let todoList = todos.querySelectorAll('li')
    let todoStorage = []

    todoList.forEach(function(item){

        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')

        todoStorage.push({
            text,
            status,
        })
    })

    localStorage.setItem('todoList', JSON.stringify(todoStorage))

}

// get data from storage
function init() {
    let data = JSON.parse(localStorage.getItem('todoList'))
    data.forEach(item => {
        addTodoElement(item)
    })
}

init()