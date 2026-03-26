// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const taskCounter = document.getElementById("task-counter");
const sortButton = document.getElementById("sort-tasks");
const filterPriority = document.getElementById("filter-priority");

const filterStatus = document.getElementById("filter-status");
const completeAllBtn = document.getElementById("complete-all");
const deleteCompletedBtn = document.getElementById("delete-completed");

let tasks = [];

// Guardar tareas
function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Actualizar contador
function updateCounter(){

const pending = tasks.filter(t => !t.completed).length;

taskCounter.textContent =
"Pendientes: " + pending + " | Total: " + tasks.length;

}

// Cargar tareas
function loadTasks(){

const savedTasks = localStorage.getItem("tasks");

if(savedTasks){

tasks = JSON.parse(savedTasks);

tasks.forEach(task => createTask(task, false));

updateCounter();

}

}

document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir tarea
form.addEventListener("submit", function(e){

e.preventDefault();

const taskText = taskInput.value.trim();

if(taskText === "") return;

const task = {
text: taskText,
priority: priority.value,
completed: false
};

createTask(task);

taskInput.value = "";

});

// Crear tarea
function createTask(task, saveToStorage = true){

const li = document.createElement("li");

li.className =
"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded shadow";

if(task.completed){
li.classList.add("opacity-50");
}

const taskContainer = document.createElement("div");
taskContainer.className = "flex flex-col";

const taskText = document.createElement("span");
taskText.textContent = task.text;
taskText.className = "text-gray-800 dark:text-white font-medium";

const priorityLabel = document.createElement("span");

priorityLabel.textContent = task.priority;

let color = "";

if(task.priority === "alta"){
color = "bg-red-500";
}

if(task.priority === "media"){
color = "bg-yellow-400 text-black";
}

if(task.priority === "baja"){
color = "bg-green-500";
}

priorityLabel.className =
"text-xs text-white px-2 py-1 rounded w-fit mt-1 " + color;

taskContainer.appendChild(taskText);
taskContainer.appendChild(priorityLabel);

const buttons = document.createElement("div");
buttons.className = "flex gap-2 flex-wrap";

// completar
const completeBtn = document.createElement("button");
completeBtn.textContent = "✔";

completeBtn.className =
"bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600";

completeBtn.addEventListener("click", function(){

task.completed = !task.completed;

li.classList.toggle("opacity-50");

saveTasks();
updateCounter();

});

// editar
const editBtn = document.createElement("button");
editBtn.textContent = "Editar";

editBtn.className =
"bg-yellow-500 text-white px-3 py-2 text-sm rounded hover:bg-yellow-600";

editBtn.addEventListener("click", function(){

const newText = prompt("Editar tarea:", task.text);

if(newText && newText.trim() !== ""){
task.text = newText.trim();
taskText.textContent = task.text;
saveTasks();
}

});

// eliminar
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Eliminar";

deleteBtn.className =
"bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600";

deleteBtn.addEventListener("click", function(){

li.remove();

tasks = tasks.filter(t => t !== task);

saveTasks();
updateCounter();

});

buttons.appendChild(completeBtn);
buttons.appendChild(editBtn);
buttons.appendChild(deleteBtn);

li.appendChild(taskContainer);
li.appendChild(buttons);

taskList.appendChild(li);

if(saveToStorage){

tasks.push(task);
saveTasks();
updateCounter();

}

}

// búsqueda
searchInput.addEventListener("input", function(){

const searchTerm = searchInput.value.toLowerCase();

taskList.innerHTML = "";

const filteredTasks = tasks.filter(task =>
task.text.toLowerCase().includes(searchTerm)
);

filteredTasks.forEach(task => createTask(task, false));

});

// ordenar
sortButton.addEventListener("click", function(){

const order = {
alta: 1,
media: 2,
baja: 3
};

tasks.sort((a,b) => order[a.priority] - order[b.priority]);

taskList.innerHTML = "";

tasks.forEach(task => createTask(task, false));

});

// filtro prioridad
filterPriority.addEventListener("change", function(){

const selected = filterPriority.value;

taskList.innerHTML = "";

let filteredTasks = tasks;

if(selected !== "all"){
filteredTasks = tasks.filter(task => task.priority === selected);
}

filteredTasks.forEach(task => createTask(task, false));

});

// filtro estado
filterStatus.addEventListener("change", function(){

const status = filterStatus.value;

taskList.innerHTML = "";

let filteredTasks = tasks;

if(status === "pending"){
filteredTasks = tasks.filter(task => !task.completed);
}

if(status === "completed"){
filteredTasks = tasks.filter(task => task.completed);
}

filteredTasks.forEach(task => createTask(task, false));

});

// completar todas
completeAllBtn.addEventListener("click", function(){

tasks.forEach(task => task.completed = true);

saveTasks();

taskList.innerHTML = "";

tasks.forEach(task => createTask(task, false));

updateCounter();

});

// borrar completadas
deleteCompletedBtn.addEventListener("click", function(){

tasks = tasks.filter(task => !task.completed);

saveTasks();

taskList.innerHTML = "";

tasks.forEach(task => createTask(task, false));

updateCounter();

});