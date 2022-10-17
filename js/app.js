const newTaskInput = document.querySelector('#new-task');
const tasksDiv = document.querySelector('#tasks-div')


let tasks = []
const createNewTask = (e) => {
    const task = {}


    if (e.code === 'Enter') {
        task.id = idGenerator()
        task.description = newTaskInput.value
        task.status = false //False = task not completed true task completed

        tasks = [...tasks, task]

        showTasks(tasks)
        newTaskInput.value = ""
    }
}


newTaskInput.addEventListener('keyup', createNewTask)



let id = 0;
function idGenerator() {
    return id++;
}

function showTasks(tasks) {
    let html = ''
    tasks.forEach(task => {
        const { id, description, status } = task;
        html += `
            <div class="items__task">
                <label class="items__checkbox"></label>
                <input value="${description}" class="items__input-task" type="text" name="" id="" placeholder="Create a new todo" />
                <div class="items__delete"></div>
            </div>       
        
        `



        tasksDiv.innerHTML = html;
    });
}
