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
const sortAlpha = document.getElementById("sort-alpha");
const completeAllBtn = document.getElementById("complete-all");
const deleteCompletedBtn = document.getElementById("delete-completed");

const statsTotal = document.getElementById("stats-total");
const statsPending = document.getElementById("stats-pending");
const statsCompleted = document.getElementById("stats-completed");

let tasks = [];

// Guardar tareas
function saveTasks(){ localStorage.setItem("tasks", JSON.stringify(tasks)); }

// Actualizar estadísticas
function updateStats(){
    const total = tasks.length;
    const pending = tasks.filter(t=>!t.completed).length;
    const completed = tasks.filter(t=>t.completed).length;
    statsTotal.textContent = "Total: "+total;
    statsPending.textContent = "Pendientes: "+pending;
    statsCompleted.textContent = "Completadas: "+completed;
}

// Cargar tareas
function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTask(task, false));
        updateStats();
    }
}
document.addEventListener("DOMContentLoaded", loadTasks);

// Crear tarea
form.addEventListener("submit", function(e){
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if(!taskText) return;
    const task = { text: taskText, priority: priority.value, completed: false };
    createTask(task);
    taskInput.value = "";
});

// Crear tarea en DOM
function createTask(task, saveToStorage=true){
    const li = document.createElement("li");
    li.className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded shadow";
    if(task.completed) li.classList.add("opacity-50");

    const taskContainer=document.createElement("div"); taskContainer.className="flex flex-col";
    const taskText=document.createElement("span"); taskText.textContent=task.text; taskText.className="text-gray-800 dark:text-white font-medium";
    const priorityLabel=document.createElement("span"); priorityLabel.textContent=task.priority;

    let color=""; if(task.priority==="alta") color="bg-red-500"; if(task.priority==="media") color="bg-yellow-400 text-black"; if(task.priority==="baja") color="bg-green-500";
    priorityLabel.className="text-xs text-white px-2 py-1 rounded w-fit mt-1 "+color;

    taskContainer.appendChild(taskText); taskContainer.appendChild(priorityLabel);

    const buttons=document.createElement("div"); buttons.className="flex gap-2 flex-wrap";

    const completeBtn=document.createElement("button"); completeBtn.textContent="✔"; completeBtn.className="bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600";
    completeBtn.addEventListener("click", function(){ task.completed=!task.completed; li.classList.toggle("opacity-50"); saveTasks(); updateStats(); });

    const editBtn=document.createElement("button"); editBtn.textContent="Editar"; editBtn.className="bg-yellow-500 text-white px-3 py-2 text-sm rounded hover:bg-yellow-600";
    editBtn.addEventListener("click", function(){ const newText=prompt("Editar tarea:",task.text); if(newText && newText.trim()!==""){task.text=newText.trim(); taskText.textContent=task.text; saveTasks(); updateStats();}});

    const deleteBtn=document.createElement("button"); deleteBtn.textContent="Eliminar"; deleteBtn.className="bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600";
    deleteBtn.addEventListener("click", function(){ li.remove(); tasks=tasks.filter(t=>t!==task); saveTasks(); updateStats(); });

    buttons.appendChild(completeBtn); buttons.appendChild(editBtn); buttons.appendChild(deleteBtn);

    li.appendChild(taskContainer); li.appendChild(buttons);
    taskList.appendChild(li);

    if(saveToStorage){ tasks.push(task); saveTasks(); updateStats(); }
}

// Búsqueda
searchInput.addEventListener("input", applyFilters);
filterPriority.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);
sortAlpha.addEventListener("change", applyFilters);

// Orden por prioridad
sortButton.addEventListener("click", function(){
    tasks.sort((a,b)=>{ const order={alta:1,media:2,baja:3}; return order[a.priority]-order[b.priority]; });
    applyFilters();
});

// Completar todas
completeAllBtn.addEventListener("click", function(){
    tasks.forEach(t=>t.completed=true); saveTasks(); applyFilters(); updateStats();
});

// Borrar completadas
deleteCompletedBtn.addEventListener("click", function(){
    tasks=tasks.filter(t=>!t.completed); saveTasks(); applyFilters(); updateStats();
});

// Aplicar filtros y orden alfabético
function applyFilters(){
    const searchTerm=searchInput.value.toLowerCase();
    const status=filterStatus.value;
    const priorityFilter=filterPriority.value;
    const alpha=sortAlpha.value;

    let filtered=tasks.filter(task=>{
        let match=true;
        if(searchTerm) match=task.text.toLowerCase().includes(searchTerm);
        if(match && status!=="all"){ match=(status==="pending")?!task.completed:task.completed; }
        if(match && priorityFilter!=="all"){ match=task.priority===priorityFilter; }
        return match;
    });

    // Orden alfabético
    if(alpha==="asc") filtered.sort((a,b)=>a.text.localeCompare(b.text));
    if(alpha==="desc") filtered.sort((a,b)=>b.text.localeCompare(a.text));

    taskList.innerHTML="";
    filtered.forEach(task=>createTask(task,false));
    updateStats();
}