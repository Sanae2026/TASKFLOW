let tasks = [];
let nextId = 1;

const obtenerTodas = () => tasks;

const crearTarea = ({ titulo, prioridad = 'baja', completada = false }) => {
  const tarea = { id: nextId++, titulo, prioridad, completada };
  tasks.push(tarea);
  return tarea;
};

const eliminarTarea = (id) => {
  const idx = tasks.findIndex(t => t.id === Number(id));
  if (idx === -1) throw new Error('NOT_FOUND');
  tasks.splice(idx, 1);
};

module.exports = { obtenerTodas, crearTarea, eliminarTarea };
