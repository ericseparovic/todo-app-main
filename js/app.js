const newTaskInput = document.querySelector("#new-task");
const tasksDiv = document.querySelector("#tasks-div");
const btnClearCompletedDesktop = document.querySelector(
  "#btn-clear-completed-desktop"
);
const btnClearCompletedMobile = document.querySelector(
  "#btn-clear-completed-mobile"
);
const countItemsDesktop = document.querySelector("#countItemsDesktop");
const countItemsMobile = document.querySelector("#countItemsMobile");
const btnFilterAll = document.querySelector("#btn-filter-all");
const btnFilterActive = document.querySelector("#btn-filter-active");
const btnFileterCompleted = document.querySelector("#btn-filter-completed");

document.addEventListener("DOMContentLoaded", () => {
  newTaskInput.addEventListener("keyup", createNewTask);
  tasksDiv.addEventListener("click", taskCompleted);
  tasksDiv.addEventListener("click", deleteTask);
  btnClearCompletedDesktop.addEventListener("click", clearCompleted);
  btnClearCompletedMobile.addEventListener("click", clearCompleted);
  btnFilterAll.addEventListener("click", filterAll);
  btnFilterActive.addEventListener("click", filterActive);
  btnFileterCompleted.addEventListener("click", filterCompleted);

  showTasks(tasks);
});

// Craete a new task and save it on an array
let tasks = [];
function createNewTask(e) {
  const task = {};

  if (e.code !== "Enter") {
    return;
  }

  task.id = idGenerator();
  task.description = newTaskInput.value;
  task.status = false; //False = task not completed true task completed

  if (task.description === "") {
    // Show error
    return alert("Input empty");
  }

  tasks = [...tasks, task];

  showTasks(tasks);
  newTaskInput.value = "";
}

// id generator
let id = 0;
function idGenerator() {
  return id++;
}

// Show tasks in the DOM
function showTasks(tasks) {
  const reverseTasks = [...tasks].reverse();
  showCountActiveTasks(tasks);

  let html = "";

  if (reverseTasks.length === 0) {
    tasksDiv.innerHTML = html;
  }

  reverseTasks.forEach((task) => {
    const { id, description, status } = task;
    if (!status) {
      html += `
            <div class="items__task" id="${id}">
                <label id="checkbox" class="items__checkbox"></label>
                <input value="${description}" class="items__input-task" type="text" name="" id="" placeholder="Create a new todo" />
                <div id="btn-delete" class="items__delete"></div>
            </div>       
        
        `;

      tasksDiv.innerHTML = html;
    } else {
      html += `
            <div class="items__task" id="${id}">
                <label id="checkbox" class="items__checkbox checkbox-active"></label>
                <input value="${description}" class="items__input-task items__input-task--active" type="text" name="" id="" placeholder="Create a new todo" />
                <div id="btn-delete" class="items__delete"></div>
            </div>       
        
            `;
    }

    tasksDiv.innerHTML = html;
  });
}

// mark task complete
function taskCompleted(e) {
  let taskId = Number(e.target.parentElement.id);

  if (
    e.target.id === "checkbox" &&
    !e.target.classList.contains("checkbox-active")
  ) {
    // Modify task status
    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = true;
        return task;
      } else {
        return task;
      }
    });

    showTasks(tasks);
  }

  if (
    e.target.id === "checkbox" &&
    e.target.classList.contains("checkbox-active")
  ) {
    // Modify task status
    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = false;
        return task;
      } else {
        return task;
      }
    });

    showTasks(tasks);
  }
}

function deleteTask(e) {
  if (e.target.id !== "btn-delete") return;

  const id = Number(e.target.parentElement.id);

  tasks = tasks.filter((task) => task.id !== id);

  showTasks(tasks);
}

function clearCompleted() {
  tasks = tasks.filter((task) => task.status === false);

  showTasks(tasks);
}

function getCountActiveTasks(tasks) {
  let count = 0;
  console.log(tasks);
  if (tasks === undefined) {
    return count;
  }

  tasks.forEach((task) => {
    if (!task.status) {
      count++;
    }
  });
  console.log(count);
  return count;
}

function showCountActiveTasks(tasks) {
  let count = getCountActiveTasks(tasks);
  countItemsDesktop.innerHTML = count;
  countItemsMobile.innerHTML = count;
}

function filterAll() {
  showTasks(tasks);
}

function filterActive() {
  const tasksActive = tasks.filter((task) => task.status === false);
  showTasks(tasksActive);
}

function filterCompleted() {
  const tasksCompleted = tasks.filter((task) => task.status === true);
  showTasks(tasksCompleted);
}
