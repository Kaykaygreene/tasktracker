// Store tasks in an array of objects
let tasks = [];

// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add new task
addTaskBtn.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    tasks.push({ description, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Render all tasks
function renderTasks() {
  // Sort tasks: incomplete first, completed last
  tasks.sort((a, b) => a.completed - b.completed);

  // Clear the list before re-rendering
  taskList.innerHTML = '';

  // Recreate list items
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.description;

    if (task.completed) {
      li.classList.add('completed');
    }

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Unmark' : 'Complete';
    toggleBtn.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });
}
