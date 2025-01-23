import { saveTasksToStorage, loadTasksFromStorage } from './storage';
import { initializeTheme } from './theme';
import { updateCounter } from './taskCounter';
import { TaskModal, EditModal } from './modal';
import { Task } from './task';
import { TaskFilters } from './filters';
import './styles.css';

let taskIndex = loadTasksFromStorage();

function initializeApp() {
  const taskModal = new TaskModal();
  const editModal = new EditModal(saveTasksToStorage);
  const taskFilters = new TaskFilters(updateCounter);
  
  initializeTheme();
  
  const inputField = document.querySelector('#input');
  const taskList = document.querySelector('.task-list');
  const clearBtn = document.querySelector('.clear-btn');

  inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskTitle = inputField.value;
      if (taskTitle === "") {
        return;
      }
      const task = new Task(
        taskTitle,
        saveTasksToStorage,
        taskModal,
        editModal,
        updateCounter
      );
      taskIndex++;
      inputField.value = "";
      task.createTask(taskIndex);
      
      if(taskList.classList.contains('completed-active')) {
        taskFilters.showCompletedTasks();
        updateCounter("completed");
      } else {
        updateCounter("active");
      }
    }
  });

  clearBtn.addEventListener('click', function() {
    const checkboxes = taskList.querySelectorAll(".task-checkbox:checked");
    checkboxes.forEach(checkbox => {
      const taskDiv = checkbox.closest(".task");
      taskDiv.remove();
    });
    saveTasksToStorage();
    if(taskList.classList.contains('completed-active')) {
      updateCounter("completed");
    } else {
      updateCounter("active");
    }
  });

  taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      saveTasksToStorage();
      updateCounter(taskList.classList.contains('completed-active') ? "completed" : "active");
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

export { taskIndex };