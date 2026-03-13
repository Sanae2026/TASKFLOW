# Conexión de servidores MCP en Cursor

## ¿Qué es el Model Context Protocol (MCP)?

El Model Context Protocol (MCP) es un protocolo que permite que los modelos de inteligencia artificial se conecten a herramientas externas como sistemas de archivos, repositorios o APIs.
Esto permite que la IA tenga acceso directo al contexto de un proyecto y pueda analizar archivos o ejecutar acciones de forma más eficiente.

## Configuración de MCP en Cursor

Para esta práctica se configuró un servidor MCP en el editor Cursor.

Los pasos realizados fueron:

1. Abrir la configuración de Cursor.
2. Buscar la sección **Installed MCP Servers**.
3. Pulsar **Add Custom MCP**.
4. Crear el archivo `.cursor/mcp.json`.
5. Añadir la configuración del servidor filesystem.
6. Guardar el archivo y reiniciar Cursor.

## Configuración utilizada

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "."
      ]
    }
  }
}
```

## Pruebas realizadas

Se realizaron varias consultas para comprobar que el servidor MCP funcionaba correctamente:

* listar los archivos del proyecto
* leer el archivo `app.js`
* explicar el funcionamiento del archivo `app.js`
* mostrar la estructura del proyecto
* identificar las funciones definidas en el archivo

## Uso de MCP en proyectos reales

El uso de MCP puede ser muy útil en proyectos reales porque permite que los modelos de IA accedan directamente a la información del proyecto.
Esto facilita tareas como analizar código, explorar grandes repositorios, automatizar tareas de desarrollo o integrar herramientas externas dentro del flujo de trabajo.
