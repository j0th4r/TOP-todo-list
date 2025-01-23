export class TaskFilters {
  constructor(updateCounter) {
    this.taskList = document.querySelector(".task-list");
    this.filterAll = document.querySelector('.all-btn');
    this.filterActive = document.querySelector('.active-btn');
    this.filterCompleted = document.querySelector('.completed-btn');
    this.updateCounter = updateCounter;
    
    this.initializeFilters();
  }

  resetButtonStyles() {
    const filterButtons = document.querySelectorAll('#btn');
    filterButtons.forEach(button => {
      button.style.color = "";
    });
  }

  initializeFilters() {
    this.filterAll.style.color = "#3A7CFD";
    
    this.filterAll.addEventListener('click', () => this.showAllTasks());
    this.filterActive.addEventListener('click', () => this.showActiveTasks());
    this.filterCompleted.addEventListener('click', () => this.showCompletedTasks());
  }

  showAllTasks() {
    this.resetButtonStyles();
    this.taskList.classList.remove('completed-active');
    this.filterAll.style.color = "#3A7CFD";
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
      task.style.display = 'flex';
      const checkbox = task.querySelector('.task-checkbox');
      checkbox.addEventListener('change', function () {
        task.style.display = 'flex'
        this.updateCounter("active");
      }.bind(this));
    });
    this.updateCounter("active")
  }

  showActiveTasks(){
    this.resetButtonStyles();
    this.taskList.classList.remove('completed-active');
    this.filterActive.style.color = "#3A7CFD";
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
      const checkbox = task.querySelector('.task-checkbox');
      if (checkbox.checked) {
        task.style.display = 'none';
      } else {
        task.style.display = 'flex';
      }
  
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          task.style.display = 'none';
          this.updateCounter("active");
        }
      });
    });
    this.updateCounter("active");
  }

  showCompletedTasks() {
    this.resetButtonStyles();
    this.taskList.classList.add('completed-active');
    this.filterCompleted.style.color = "#3A7CFD";
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
          this.updateCounter("completed");
          task.style.display = 'none';
        }
      });
    });
    this.updateCounter("completed");
  }
}