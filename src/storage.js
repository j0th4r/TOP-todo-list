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
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskData, index) => {
      const task = new Task(taskData.title);
      taskIndex = index + 1;
      task.createTask(taskIndex);
      
      const taskDiv = document.querySelectorAll('.task')[index];
      taskDiv.querySelector('.task-desc').textContent = taskData.description;
      taskDiv.querySelector('.task-date').textContent = taskData.date;
      taskDiv.querySelector('.task-checkbox').checked = taskData.completed;
    });
    updateCounter("active");
  }
}
