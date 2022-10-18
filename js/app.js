const newTaskInput = document.querySelector('#new-task');
const tasksDiv = document.querySelector('#tasks-div')

newTaskInput.addEventListener('keyup', createNewTask)
tasksDiv.addEventListener('click', taskCompleted)

// Craete a new task and save it on an array
let tasks = []
function createNewTask(e) {
    const task = {}

    if (e.code !== 'Enter') {
        return
    }

    task.id = idGenerator()
    task.description = newTaskInput.value
    task.status = false //False = task not completed true task completed

    if (task.description === "") {
        // Show error
        return alert('Input empty')
    }

    tasks = [...tasks, task]

    showTasks(tasks)
    newTaskInput.value = ""
}




// id generator
let id = 0;
function idGenerator() {
    return id++;
}


// Show tasks in the DOM
function showTasks(tasks) {
    let html = ''
    tasks.forEach(task => {
        const { id, description, status } = task;
        if (!status) {
            html += `
            <div class="items__task" id="${id}">
                <label id="checkbox" class="items__checkbox"></label>
                <input value="${description}" class="items__input-task" type="text" name="" id="" placeholder="Create a new todo" />
                <div class="items__delete"></div>
            </div>       
        
        `

            tasksDiv.innerHTML = html;

        } else {
            html += `
            <div class="items__task" id="${id}">
                <label id="checkbox" class="items__checkbox checkbox-active"></label>
                <input value="${description}" class="items__input-task items__input-task--active" type="text" name="" id="" placeholder="Create a new todo" />
                <div class="items__delete"></div>
            </div>       
        
            `
        }

        tasksDiv.innerHTML = html;

    });
}






// mark task complete
function taskCompleted(e) {


    let taskId = Number(e.target.parentElement.id)


    if (e.target.id === 'checkbox' && !e.target.classList.contains('checkbox-active')) {
        // Modify task status
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.status = true
                return task
            } else {
                return task
            }
        })

        showTasks(tasks)
    }


    if (e.target.id === 'checkbox' && e.target.classList.contains('checkbox-active')) {

        // Modify task status
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.status = false
                return task
            } else {
                return task
            }
        })

        showTasks(tasks)

    }


}

