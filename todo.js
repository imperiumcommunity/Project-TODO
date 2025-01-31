// script.js

// DOM Elements
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render Tasks
function renderTasks(filter = "") {
    taskList.innerHTML = tasks
        .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
        .map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                ${task.text} (${task.category})
                <div>
                    <button onclick="toggleComplete(${index})">✔</button>
                    <button onclick="deleteTask(${index})">✖</button>
                </div>
            </li>
        `)
        .join('');
}

// Add Task
function addTask() {
    const text = taskInput.value.trim();
    const category = categoryInput.value;
    if (!text) return alert('Please enter a task!');
    tasks.push({ text, category, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Search Tasks
searchInput.addEventListener('input', (e) => renderTasks(e.target.value));

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial Render
renderTasks();

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
