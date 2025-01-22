export function updateCounter(choice) {
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