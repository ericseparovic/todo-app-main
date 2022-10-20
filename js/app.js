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
const btnFilter = document.querySelector("#btn-filter");
let statusFilter = "all";

document.addEventListener("DOMContentLoaded", (e) => {
  newTaskInput.addEventListener("keyup", createNewTask);
  tasksDiv.addEventListener("click", taskCompleted);
  tasksDiv.addEventListener("click", deleteTask);
  btnClearCompletedDesktop.addEventListener("click", clearCompleted);
  btnClearCompletedMobile.addEventListener("click", clearCompleted);
  btnFilter.addEventListener("click", filter);

  filter(e);
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
  // Short reverse task
  const reverseTasks = [...tasks].reverse();

  // Show count items
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

// Get number of active tasks
function getCountActiveTasks(tasks) {
  let count = 0;
  if (tasks === undefined) {
    return count;
  }

  tasks.forEach((task) => {
    if (!task.status) {
      count++;
    }
  });
  return count;
}

// Shows number of pending tasks
function showCountActiveTasks(tasks) {
  let count = getCountActiveTasks(tasks);
  countItemsDesktop.innerHTML = count;
  countItemsMobile.innerHTML = count;
}

// Filter active tasks and return their value
function filterActive(tasks) {
  const tasksActive = tasks.filter((task) => task.status === false);
  return tasksActive;
}

// Filter competed tasks and return their value
function filterCompleted(tasks) {
  const tasksCompleted = tasks.filter((task) => task.status === true);
  return tasksCompleted;
}

// Filter tasks by their status
function filter(e) {
  if (e === undefined || e.type === "DOMContentLoaded") {
    showTasks(tasks);
    colorSelectFilter(e);
    return;
  }

  if (e.target.id === "all") {
    showTasks(tasks);
    colorSelectFilter(e);
    return;
  }

  if (e.target.id === "active") {
    const tasksActive = filterActive(tasks);
    showTasks(tasksActive);
    colorSelectFilter(e);
    return;
  }

  if (e.target.id === "completed") {
    const tasksCompleted = filterCompleted(tasks);
    showTasks(tasksCompleted);
    colorSelectFilter(e);
    return;
  }
}

// Change the color of the selected filter
function colorSelectFilter(e) {
  if (e === undefined || e.type === "DOMContentLoaded") {
    const btnAll = btnFilter.querySelector("#all");
    btnAll.classList.add("btn-filter-select--blue");
    return;
  }

  const btnsFilter = e.target.parentElement.querySelectorAll(
    ".items__footer-filter-btn"
  );

  const btnSelect = e.target.id;

  btnsFilter.forEach((btn) => {
    if (btn.id === btnSelect) {
      btn.classList.add("btn-filter-select--blue");
    } else {
      btn.classList.remove("btn-filter-select--blue");
    }
  });
}
