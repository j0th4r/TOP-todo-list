// Import all modules
import { saveTasksToStorage, loadTasksFromStorage } from './storage';
import { initializeTheme } from './theme';
import { updateCounter } from './taskCounter';
import { TaskModal, EditModal } from './modal';
import { Task } from './task';
import { TaskFilters } from './filters';

//Import css
import './styles.css'

// Global task index
let taskIndex = 0;

// Initialize the application
function initializeApp() {
  // Initialize components
  const taskModal = new TaskModal();
  const editModal = new EditModal(saveTasksToStorage);
  const taskFilters = new TaskFilters(updateCounter);
  
  // Initialize theme
  initializeTheme();
  
  // Setup task creation
  const inputField = document.querySelector('#input');
  const taskList = document.querySelector('.task-list');
  const clearBtn = document.querySelector('.clear-btn');

  // Load existing tasks
  loadTasksFromStorage();

  // Add task event listener
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

  // Clear completed tasks
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

  // Save tasks when checkbox state changes
  taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      saveTasksToStorage();
      updateCounter(taskList.classList.contains('completed-active') ? "completed" : "active");
    }
  });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Export the taskIndex for other modules if needed
export { taskIndex };