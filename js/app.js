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
        html += `
            <div class="items__task">
                <label id="checkbox" class="items__checkbox"></label>
                <input value="${description}" class="items__input-task" type="text" name="" id="" placeholder="Create a new todo" />
                <div class="items__delete"></div>
            </div>       
        
        `



        tasksDiv.innerHTML = html;
    });
}






// mark task complete
function taskCompleted(e) {


    tasks.map(task)




    if (e.target.id === 'checkbox' && !e.target.classList.contains('checkbox-active')) {
        e.target.classList.add('checkbox-active')
        e.target.parentElement.querySelector('.items__input-task').classList.add('items__input-task--active')
        return
    }


    if (e.target.id === 'checkbox' && e.target.classList.contains('checkbox-active')) {

        e.target.classList.remove('checkbox-active')
        e.target.parentElement.querySelector('.items__input-task').classList.remove('items__input-task--active')
        return
    }


}

