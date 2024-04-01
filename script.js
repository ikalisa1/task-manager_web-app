// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('tasks');
const markAllButton = document.getElementById('mark-all-button');
const deleteAllButton = document.getElementById('delete-all-button');

// Add event listeners
addButton.addEventListener('click', addTask);
markAllButton.addEventListener('click', markAllTasksCompleted);
deleteAllButton.addEventListener('click', deleteAllTasks);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}

// Function to mark a task as completed
function markTaskCompleted(event) {
  const taskItem = event.currentTarget;
  taskItem.classList.toggle('completed');
  toggleTaskStatus(event);
}

// Function to mark all tasks as completed
function markAllTasksCompleted() {
  const taskItems = document.querySelectorAll('#tasks li');
  taskItems.forEach(taskItem => {
    taskItem.classList.add('completed');
    toggleTaskStatus({ currentTarget: taskItem }); // Simulate event for toggling status
  });
}

// Function to delete a task
function deleteTask(event) {
    const clickedElement = event.target;
    const taskItem = clickedElement.closest('li');
    if (taskItem && clickedElement.classList.contains('delete-button')) {
      taskList.removeChild(taskItem);
    }
  }
  
  // Add event listener to taskList for handling delete button clicks
  taskList.addEventListener('click', deleteTask);
  
  
// Function to delete all tasks
function deleteAllTasks() {
  taskList.innerHTML = '';
}

// Function to create a task element
function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.style.paddingRight = '60px'; // Adjusted padding to prevent overlap with delete button

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);

  const markDone = document.createElement('div');
  markDone.classList.add('mark-done');
  markDone.addEventListener('click', markTaskCompleted);

  const taskStatus = document.createElement('span');
  taskStatus.classList.add('task-status');
  taskStatus.textContent = 'NOT DONE';

  li.appendChild(deleteButton);
  li.appendChild(markDone);
  li.appendChild(taskStatus);

  // Add click event listener to the task item itself
  li.addEventListener('click', markTaskCompleted);

  return li;
}

// Function to toggle task status when clicking mark-done button
function toggleTaskStatus(event) {
  const taskItem = event.currentTarget;
  const taskStatus = taskItem.querySelector('.task-status');
  if (taskItem.classList.contains('completed')) {
    taskStatus.textContent = 'DONE';
    taskStatus.style.color = '#4CAF50';
  } else {
    taskStatus.textContent = 'NOT DONE';
    taskStatus.style.color = '#333';
  }
