# Cursor Workflow

Este documento describe mi experiencia usando Cursor como editor
de código asistido por inteligencia artificial.

Se documentará:

- exploración de la interfaz
- uso del autocompletado
- chat contextual
- edición inline
- ejemplos de mejoras en el código

## Exploración de la interfaz

Abrí el proyecto TaskFlow en :contentReference[oaicite:0]{index=0}.

La interfaz es muy similar a la de Visual Studio Code y contiene varias herramientas importantes:

- Explorador de archivos para ver la estructura del proyecto.
- Editor de código para modificar archivos.
- Terminal integrada para ejecutar comandos.
- Chat de inteligencia artificial que permite hacer preguntas sobre el código.

Esto facilita trabajar en el proyecto y pedir ayuda directamente desde el editor.


## Uso del autocompletado

Probé el autocompletado escribiendo comentarios que describían una función.

Por ejemplo escribí el siguiente comentario en el archivo `app.js`:

// function that filters completed tasks from an array

Cursor generó automáticamente una función que filtraba tareas completadas usando el método filter() de JavaScript.

Esto permite generar código rápidamente sin escribir toda la lógica manualmente.


## Uso del chat contextual

También utilicé el chat contextual para pedir explicaciones sobre partes del código.

Seleccioné una función y pedí a Cursor que explicara qué hacía.
La IA explicó paso a paso el funcionamiento de la función y los métodos utilizados.

Esta herramienta es útil para entender código que no se ha escrito uno mismo.


## Edición inline

La edición inline permite modificar código directamente con ayuda de la IA.

Seleccioné una función y pedí que la refactorizara para mejorar su legibilidad.

Cursor reorganizó el código, añadió nombres de variables más claros y separó la lógica en varias líneas para que fuera más fácil de entender.

Atajos de teclado utilizados

Durante las pruebas utilicé algunos atajos de teclado de Cursor:

Ctrl + L → abrir chat de IA

Ctrl + K → editar código con IA

Ctrl + Enter → aceptar sugerencias

Estos atajos hacen que trabajar con la IA sea más rápido.


## Ejemplo 1 de mejora del código

Cursor ayudó a refactorizar una función que añadía tareas a la lista.
El código original estaba escrito en una sola línea y era difícil de leer.

Después de usar la edición inline, Cursor generó una versión más clara con una estructura mejor organizada.

## Ejemplo 2 de mejora del código

También utilicé el chat para pedir una explicación de una función que filtraba tareas completadas.

Cursor explicó cómo funcionaba el método filter() y cómo se utilizaba para recorrer el array de tareas.

Esto ayudó a entender mejor el funcionamiento del código.