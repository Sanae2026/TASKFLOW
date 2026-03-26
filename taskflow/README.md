# TaskFlow

TaskFlow es una aplicación web sencilla para gestionar tareas diarias.  
Permite añadir, editar, eliminar y organizar tareas con diferentes niveles de prioridad.

El proyecto ha sido desarrollado utilizando **HTML, CSS y JavaScript**, aplicando además herramientas de **IA para mejorar el desarrollo, refactorización y documentación**.

---

# Características

- Añadir nuevas tareas
- Eliminar tareas
- Editar tareas existentes
- Buscar tareas por texto
- Ordenar tareas por prioridad
- Filtrar tareas por prioridad
- Guardado automático mediante localStorage
- Contador de tareas

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Git y GitHub
- Cursor IDE con asistencia de IA

---

# Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Sanae2026/taskflow.git

---

## Testing manual de la aplicación

### Lista vacía
Al abrir la aplicación por primera vez, la lista aparece vacía y las estadísticas muestran correctamente Total: 0, Pendientes: 0, Completadas: 0. La interfaz se renderiza sin errores.

### Añadir tarea sin título
Al intentar enviar el formulario con el campo vacío, el navegador bloquea el envío gracias al atributo `required`. No se crea ninguna tarea y no se produce ningún error.

### Tarea con título muy largo
Se añadió una tarea con un texto de más de 200 caracteres. El texto se adapta correctamente dentro de su contenedor usando `word-break: break-word` y `overflow-wrap: anywhere`, sin desbordar ni romper el layout en ningún tamaño de pantalla.

### Marcar tareas como completadas
Se marcaron varias tareas como completadas pulsando el botón ✔. Cada tarea marcada reduce su opacidad visualmente. El contador de Pendientes disminuye y el de Completadas aumenta en tiempo real de forma correcta.

### Eliminar tareas
Se eliminaron varias tareas individualmente con el botón Eliminar. Las tareas desaparecen de la lista y las estadísticas se actualizan inmediatamente. También se probó el botón "Borrar tareas completadas", eliminando en bloque todas las completadas sin afectar a las pendientes.

### Persistencia de datos al recargar
Tras recargar la página, todas las tareas (incluyendo su estado de completada/pendiente y su prioridad) se recuperan correctamente desde `localStorage`. Las estadísticas también se restauran con los valores correctos.

### Resultado general
Todas las pruebas superadas sin errores. La aplicación funciona de forma estable y predecible en todos los escenarios probados.