const taskList = document.querySelector(".task-list");
const clearBtn = document.querySelector('.clear-btn');
const filterAll = document.querySelector('.all-btn');
const filterActive = document.querySelector('.active-btn');
const filterCompleted = document.querySelector('.completed-btn');
filterAll.style.color = "#3A7CFD";

function saveTasksToStorage() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(taskDiv => {
    tasks.push({
      title: taskDiv.querySelector('.task-text').textContent,
      description: taskDiv.querySelector('.task-desc').textContent,
      date: taskDiv.querySelector('.task-date').textContent,
      completed: taskDiv.querySelector('.task-checkbox').checked
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskData, index) => {
      const task = new Task(taskData.title);
      taskIndex = index + 1;
      task.createTask(taskIndex);
      
      // Set additional task data
      const taskDiv = document.querySelectorAll('.task')[index];
      taskDiv.querySelector('.task-desc').textContent = taskData.description;
      taskDiv.querySelector('.task-date').textContent = taskData.date;
      taskDiv.querySelector('.task-checkbox').checked = taskData.completed;
    });
    updateCounter("active");
  }
}


function resetButtonStyles() {
  const filterButtons = document.querySelectorAll('#btn');
  filterButtons.forEach(button => {
    button.style.color = "";
  });
}

function removeTask(checkbox) {
  const taskDiv = checkbox.closest(".task");
  taskDiv.remove();
  saveTasksToStorage();
  if(taskList.classList.contains('completed-active')) {
    updateCounter("completed");
  } else {
    updateCounter("active");
  }
}

function updateCounter(choice) {
  const taskCount = document.querySelector('.task-count');
  const tasks = document.querySelectorAll('.task');
  const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
  const activeTasks = tasks.length - completedTasks;
  if (choice === "active") {
    taskCount.textContent = `${activeTasks} items left`;
  } else if (choice === "completed") {
    taskCount.textContent = `${completedTasks} items completed`;
  }
}

// Select modal elements
const modal = document.getElementById("task-modal");
const closeModal = document.getElementById("close-modal");
const modalTaskTitle = document.getElementById("modal-task-title");
const modalTaskDesc = document.getElementById("modal-task-desc");
const modalTaskDate = document.getElementById("modal-task-date");

// Function to open the modal and display task details
function openModal(task) {
  const taskTitle = task.querySelector(".task-text").textContent;
  const taskDesc = task.querySelector(".task-desc").textContent;
  const taskDate = task.querySelector(".task-date").textContent;

  modalTaskTitle.textContent = taskTitle;
  modalTaskDesc.textContent = taskDesc;
  modalTaskDate.textContent = taskDate;

  modal.style.display = "flex"; // Show modal
}

const modalEdit = document.getElementById("edit-task-modal");
const closeEditModal = document.getElementById("edit-close-modal");

function editModal(task) {
  const inputTitle = modalEdit.querySelector("#title");
  const inputDesc = modalEdit.querySelector("#desc");
  const inputDate = modalEdit.querySelector("#date");

  inputTitle.value = task.querySelector(".task-text").textContent;
  inputDesc.value = task.querySelector(".task-desc").textContent;
  inputDate.value = task.querySelector(".task-date").textContent;

  modalEdit.style.display = "flex"; // Show modal

  const saveChanges = () => {
    task.querySelector(".task-text").textContent = inputTitle.value;
    task.querySelector(".task-desc").textContent = inputDesc.value;
    task.querySelector(".task-date").textContent = inputDate.value;
    modalEdit.style.display = "none";
    saveTasksToStorage(); // Save after editing
  };

  modalEdit.querySelector("#save-edit").addEventListener("click", saveChanges, { once: true });
}

closeEditModal.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

// Event listener for closing the modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Event listener for closing the modal when clicking outside the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


class Task {
  constructor(taskTitle) {
    this.taskTitle = taskTitle;
  }
  
  createTask(taskId) {
    const taskList = document.querySelector(".task-list");
    const taskTitle = this.taskTitle.trim();

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskContainerDiv = document.createElement("div");
    taskContainerDiv.classList.add("task-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-task-${taskId}`;
    checkbox.classList.add("task-checkbox");

    checkbox.addEventListener('change', function () {
      updateCounter("active");
    });

    const label = document.createElement("label");
    label.htmlFor = `check-task-${taskId}`;
    label.classList.add("task-checkmark");

    const title = document.createElement("p");
    title.classList.add("task-text");
    title.textContent = taskTitle;

    const description = document.createElement("p");
    description.classList.add("task-desc");

    const date = document.createElement("p");
    date.classList.add("task-date");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");

    const removeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    removeSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    removeSvg.setAttribute("width", "18");
    removeSvg.setAttribute("height", "18");
    removeSvg.setAttribute("viewBox", "0 0 18 18");

    const removePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    removePath.setAttribute("fill", "#494C6B");
    removePath.setAttribute("fill-rule", "evenodd");
    removePath.setAttribute("d", "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z");

    removeSvg.appendChild(removePath);

    removeBtn.appendChild(removeSvg);

    removeBtn.addEventListener('click', removeTask.bind(null, checkbox));

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");

    const editSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    editSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    editSvg.setAttribute("height", "24");
    editSvg.setAttribute("width", "24");
    editSvg.setAttribute("fill", "#494C6B");
    editSvg.setAttribute("viewBox", "0 -960 960 960");

    const editPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    editPath.setAttribute(
      "d",
      "M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm263-224 37-39-37-37-38 38 38 38Z"
    );

    editSvg.appendChild(editPath);
    editBtn.appendChild(editSvg);


    taskContainerDiv.appendChild(removeBtn);
    taskContainerDiv.appendChild(checkbox);
    taskContainerDiv.appendChild(label);
    taskContainerDiv.appendChild(title);
    taskContainerDiv.appendChild(editBtn);
    taskContainerDiv.appendChild(description);
    taskContainerDiv.appendChild(date);

    editBtn.addEventListener("click", () => editModal(taskDiv));

    title.addEventListener("click", () => openModal(taskDiv));

    taskDiv.appendChild(taskContainerDiv);

    taskList.appendChild(taskDiv);
    
    saveTasksToStorage();
  }
}

let taskIndex = 0;
const addTask = (event) => {
  if (event.key === 'Enter') {
    const taskTitle = inputField.value;
    if (taskTitle === "") {
      return;
    }
    const task = new Task(taskTitle);
    taskIndex++;
    inputField.value = "";
    task.createTask(taskIndex);
    if(taskList.classList.contains('completed-active')) {
      filterCompleted.click();
      updateCounter("completed");
    } else {
      updateCounter("active");
    }
  }
}

const inputField = document.querySelector('#input');
inputField.addEventListener('keypress', addTask);


// Event listener for the clear button
clearBtn.addEventListener('click', function () {
  const checkboxes = taskList.querySelectorAll(".task-checkbox:checked"); // Get all checked checkboxes
  checkboxes.forEach(checkbox => {
    const taskDiv = checkbox.closest(".task"); // Get the parent task div
    taskDiv.remove(); // Remove the task div
  });
  saveTasksToStorage();
  if(taskList.classList.contains('completed-active')) {
    updateCounter("completed");
  } else {
    updateCounter("active");
  }
});

// Filter Functions
filterAll.addEventListener('click', function () {
  resetButtonStyles();
  taskList.classList.remove('completed-active');
  filterAll.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    task.style.display = 'flex';
    const checkbox = task.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function () {
      task.style.display = 'flex'
      updateCounter("active");
    });
  }); // Show all tasks
  updateCounter("active");
});

filterActive.addEventListener('click', function () {
  resetButtonStyles();
  taskList.classList.remove('completed-active');
  filterActive.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.task-checkbox');
    if (checkbox.checked) {
      task.style.display = 'none'; // Hide completed tasks
    } else {
      task.style.display = 'flex'; // Show active tasks
    }

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        task.style.display = 'none';
        updateCounter("active");
      }
    });
  });
  updateCounter("active");
});

filterCompleted.addEventListener('click', function () {
  resetButtonStyles();
  taskList.classList.add('completed-active');
  filterCompleted.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.task-checkbox');

    if (checkbox.checked) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }

    checkbox.addEventListener('change', function () {
      if (!checkbox.checked) {
        updateCounter("completed");
        task.style.display = 'none';
      }
    });
  });
  updateCounter("completed");
});

document.querySelector('.task-list').addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    saveTasksToStorage();
  }
});

document.addEventListener('DOMContentLoaded', loadTasksFromStorage);


let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.getElementById('theme-sw');

const enableLightMode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
}

const disableLightMode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
}

if (lightmode === "active") enableLightMode();

themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem('lightmode');
  lightmode !== "active" ? enableLightMode() : disableLightMode();
});