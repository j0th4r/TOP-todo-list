// task.js
export class Task {
  constructor(taskTitle, saveTasksToStorage, taskModal, editModal, updateCounter) {
    this.taskTitle = taskTitle;
    this.saveTasksToStorage = saveTasksToStorage;
    this.taskModal = taskModal;
    this.editModal = editModal;
    this.updateCounter = updateCounter;
  }

  removeTask(checkbox) {
    const taskDiv = checkbox.closest(".task");
    const taskList = document.querySelector(".task-list");
    taskDiv.remove();
    this.saveTasksToStorage();
    
    if(taskList.classList.contains('completed-active')) {
      this.updateCounter("completed");
    } else {
      this.updateCounter("active");
    }
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

    checkbox.addEventListener('change', () => {
      this.updateCounter("active");
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

    // Using the class method for removal
    removeBtn.addEventListener('click', () => this.removeTask(checkbox));

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

    editBtn.addEventListener("click", () => this.editModal.editModal(taskDiv));
    title.addEventListener("click", () => this.taskModal.openModal(taskDiv));

    taskDiv.appendChild(taskContainerDiv);
    taskList.appendChild(taskDiv);
    
    this.saveTasksToStorage();
  }
}