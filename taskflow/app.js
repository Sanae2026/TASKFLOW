// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const taskCounter = document.getElementById("task-counter");
const sortButton = document.getElementById("sort-tasks");

let tasks = [];

// Guardar tareas en localStorage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Actualizar contador
function updateCounter(){
    taskCounter.textContent = "Total de tareas: " + tasks.length;
}

// Cargar tareas guardadas
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
        priority: priority.value
    };

    createTask(task);

    taskInput.value = "";

});

// Crear tarea en el DOM
function createTask(task, saveToStorage = true){

    const li = document.createElement("li");
    li.classList.add(task.priority);

    const span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";

    // Botón editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";

    editBtn.addEventListener("click", function(){

        const newText = prompt("Editar tarea:", task.text);

        if(newText && newText.trim() !== ""){
            task.text = newText.trim();
            span.textContent = task.text + " (" + task.priority + ")";
            saveTasks();
        }

    });

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.addEventListener("click", function(){

        li.remove();
        tasks = tasks.filter(t => t.text !== task.text);
        saveTasks();
        updateCounter();

    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    if(saveToStorage){

        tasks.push(task);
        saveTasks();
        updateCounter();

    }

}

// Búsqueda
searchInput.addEventListener("input", function(){

    const searchTerm = searchInput.value.trim().toLowerCase();

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );

    filteredTasks.forEach(task => createTask(task, false));

});

// Ordenar por prioridad
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