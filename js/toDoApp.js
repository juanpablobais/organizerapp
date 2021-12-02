const formId = document.getElementById('formId');
const taskList = document.getElementById('task-list');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
const input = document.getElementById('input');
let tasks = {

}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    showTasks()
})

taskList.addEventListener('click', e =>{
    btnAction(e)
})

formId.addEventListener('submit', e => {
    e.preventDefault()

    setTask(e)
})

const setTask = e => {
    if (input.value.trim() === ''){
        Swal.fire(
            "Can't be empty.",
            'Try again',
            'error'
          )
        return
    }

    const task = {
        id: Date.now(),
        text: input.value,
        status: false,
    }
    
    tasks[task.id] = task

    console.log(tasks)

    formId.reset()
    input.focus()

    showTasks()
}

const showTasks = () => {

    localStorage.setItem('tasks', JSON.stringify(tasks))

    if(Object.values(tasks).length === 0) {
        taskList.innerHTML = `
        <div class="alert alert-dark text-center"> 
        No pending tasks 😎
        </div>
        `
        return
    }


    taskList.innerHTML = ''
    Object.values(tasks).forEach(task =>{
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = task.text

        if(task.status){
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = task.id
        clone.querySelectorAll('.fas')[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    taskList.appendChild(fragment)
}

const btnAction = e =>{
    if (e.target.classList.contains('fa-check-circle')){
        console.log(e.target.dataset.id)
        tasks[e.target.dataset.id].status = true
        showTasks()
        console.log(tasks)
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        delete tasks[e.target.dataset.id]
        showTasks()
        console.log(tasks)
    }

    if (e.target.classList.contains('fa-undo-alt')){
        console.log(e.target.dataset.id)
        tasks[e.target.dataset.id].status = false
        showTasks()
    }

    e.stopPropagation()
}

document.getElementById("btnHome2").onclick = function () {
    location.href = "./selectApp.html";}