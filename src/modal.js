export class TaskModal {
  constructor() {
    this.modal = document.getElementById("task-modal");
    this.closeModal = document.getElementById("close-modal");
    this.modalTaskTitle = document.getElementById("modal-task-title");
    this.modalTaskDesc = document.getElementById("modal-task-desc");
    this.modalTaskDate = document.getElementById("modal-task-date");
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.closeModal.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }

  openModal(task) {
    const taskTitle = task.querySelector(".task-text").textContent;
    const taskDesc = task.querySelector(".task-desc").textContent;
    const taskDate = task.querySelector(".task-date").textContent;

    this.modalTaskTitle.textContent = taskTitle;
    this.modalTaskDesc.textContent = taskDesc;
    this.modalTaskDate.textContent = taskDate;

    this.modal.style.display = "flex";
  }
}

export class EditModal {
  constructor(saveTasksToStorage) {
    this.modalEdit = document.getElementById("edit-task-modal");
    this.closeEditModal = document.getElementById("edit-close-modal");
    this.saveTasksToStorage = saveTasksToStorage;
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.closeEditModal.addEventListener("click", () => {
      this.modalEdit.style.display = "none";
    });
  }

  editModal(task) {
    const inputTitle = this.modalEdit.querySelector("#title");
    const inputDesc = this.modalEdit.querySelector("#desc");
    const inputDate = this.modalEdit.querySelector("#date");

    inputTitle.value = task.querySelector(".task-text").textContent;
    inputDesc.value = task.querySelector(".task-desc").textContent;
    inputDate.value = task.querySelector(".task-date").textContent;

    this.modalEdit.style.display = "flex";

    const saveChanges = () => {
      task.querySelector(".task-text").textContent = inputTitle.value;
      task.querySelector(".task-desc").textContent = inputDesc.value;
      task.querySelector(".task-date").textContent = inputDate.value;
      this.modalEdit.style.display = "none";
      this.saveTasksToStorage();
    };

    this.modalEdit.querySelector("#save-edit").addEventListener("click", saveChanges, { once: true });
  }
}