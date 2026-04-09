import { getTasks, createTask, deleteTask } from './api/client.js';

// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filter-priority");
const filterStatus = document.getElementById("filter-status");
const sortAlpha = document.getElementById("sort-alpha");
const sortButton = document.getElementById("sort-tasks");
const completeAllBtn = document.getElementById("complete-all");
const deleteCompletedBtn = document.getElementById("delete-completed");

const statsTotal = document.getElementById("stats-total");
const statsPending = document.getElementById("stats-pending");
const statsCompleted = document.getElementById("stats-completed");

let tasks = [];

// Mostrar estado de carga
function setLoading(active) {
  taskList.innerHTML = active ? '<li class="text-center text-gray-500 py-4">Cargando tareas...</li>' : '';
}

// Mostrar error
function showError(msg) {
  taskList.innerHTML = `<li class="text-center text-red-500 py-4">${msg}</li>`;
}

// Actualizar estadísticas
function updateStats() {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  statsTotal.textContent = "Total: " + total;
  statsPending.textContent = "Pendientes: " + pending;
  statsCompleted.textContent = "Completadas: " + completed;
}

// Cargar tareas desde el servidor
async function loadTasks() {
  setLoading(true);
  try {
    tasks = await getTasks();
    tasks = tasks.map(t => ({ ...t, text: t.titulo, completed: t.completada }));
    setLoading(false);
    applyFilters();
    updateStats();
  } catch (e) {
    showError('No se pudo conectar al servidor. ¿Está arrancado?');
  }
}

document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir tarea
form.addEventListener("submit", async e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  try {
    const nueva = await createTask(text);
    tasks.push({ ...nueva, text: nueva.titulo, completed: nueva.completada });
    taskInput.value = "";
    applyFilters();
    updateStats();
  } catch (e) {
    showError('Error al crear la tarea. Inténtalo de nuevo.');
  }
});

// Crear elemento visual de tarea
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded shadow";
  if (task.completed) li.classList.add("opacity-50");

  const container = document.createElement("div");
  container.className = "flex flex-col break-words max-w-full";

  const span = document.createElement("span");
  span.textContent = task.text;
  span.className = "text-gray-800 dark:text-white font-medium break-words";

  const label = document.createElement("span");
  label.textContent = task.priority || 'baja';
  let color = task.priority === "alta" ? "bg-red-500" :
              task.priority === "media" ? "bg-yellow-400 text-black" : "bg-green-500";
  label.className = "text-xs text-white px-2 py-1 rounded w-fit mt-1 " + color;

  container.appendChild(span);
  container.appendChild(label);

  const buttons = document.createElement("div");
  buttons.className = "flex gap-2 flex-wrap justify-start";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.className = "bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600";
  completeBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("opacity-50");
    updateStats();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.className = "bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600";
  deleteBtn.addEventListener("click", async () => {
    try {
      await deleteTask(task.id);
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      updateStats();
    } catch (e) {
      showError('Error al eliminar la tarea.');
    }
  });

  buttons.appendChild(completeBtn);
  buttons.appendChild(deleteBtn);
  li.appendChild(container);
  li.appendChild(buttons);
  return li;
}

// Filtros
searchInput.addEventListener("input", applyFilters);
filterPriority.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);
sortAlpha.addEventListener("change", applyFilters);

sortButton.addEventListener("click", () => {
  const order = { alta: 1, media: 2, baja: 3 };
  tasks.sort((a, b) => order[a.priority] - order[b.priority]);
  applyFilters();
});

completeAllBtn.addEventListener("click", () => {
  tasks.forEach(t => t.completed = true);
  applyFilters();
  updateStats();
});

deleteCompletedBtn.addEventListener("click", async () => {
  const completed = tasks.filter(t => t.completed);
  for (const t of completed) {
    try { await deleteTask(t.id); } catch (e) {}
  }
  tasks = tasks.filter(t => !t.completed);
  applyFilters();
  updateStats();
});

function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const status = filterStatus.value;
  const prio = filterPriority.value;
  const alpha = sortAlpha.value;

  let filtered = tasks.filter(task => {
    let ok = true;
    if (term) ok = task.text.toLowerCase().includes(term);
    if (ok && status !== "all") ok = status === "pending" ? !task.completed : task.completed;
    if (ok && prio !== "all") ok = task.priority === prio;
    return ok;
  });

  if (alpha === "asc") filtered.sort((a, b) => a.text.localeCompare(b.text));
  if (alpha === "desc") filtered.sort((a, b) => b.text.localeCompare(a.text));

  taskList.innerHTML = "";
  filtered.forEach(task => taskList.appendChild(createTaskElement(task)));
  updateStats();
}