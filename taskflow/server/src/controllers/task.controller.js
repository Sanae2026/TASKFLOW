const taskService = require('../services/task.service');

const getTasks = (req, res) => {
  res.json(taskService.obtenerTodas());
};

const createTask = (req, res) => {
  const { titulo, prioridad } = req.body;
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
    return res.status(400).json({ error: 'El titulo debe tener al menos 3 caracteres.' });
  }
  const tarea = taskService.crearTarea({ titulo: titulo.trim(), prioridad });
  res.status(201).json(tarea);
};

const deleteTask = (req, res, next) => {
  try {
    taskService.eliminarTarea(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, deleteTask };
