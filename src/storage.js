import { Task } from './task';
import { updateCounter } from './taskCounter';
import { TaskModal, EditModal } from './modal';

export function saveTasksToStorage() {
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

export function loadTasksFromStorage() {
  const savedTasks = localStorage.getItem('tasks');
  const taskModal = new TaskModal();
  const editModal = new EditModal(saveTasksToStorage);
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskData, index) => {
      const task = new Task(taskData.title, saveTasksToStorage, taskModal, editModal, updateCounter);
      task.createTask(index + 1);
      
      const taskDiv = document.querySelectorAll('.task')[index];
      if (taskDiv) {
        taskDiv.querySelector('.task-desc').textContent = taskData.description;
        taskDiv.querySelector('.task-date').textContent = taskData.date;
        taskDiv.querySelector('.task-checkbox').checked = taskData.completed;
      } 
    });
    updateCounter("active");
    console.log(tasks.length);
    return tasks.length;
  }
  return 0;
}