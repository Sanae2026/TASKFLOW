# Herramientas del ecosistema backend

## Axios

Axios es una librería HTTP para JavaScript que funciona tanto en el navegador como en Node.js. Simplifica las peticiones HTTP respecto a fetch nativo añadiendo conversion automatica de JSON, interceptores de peticiones y respuestas, cancelacion de peticiones en curso y soporte para progreso de subida y descarga de archivos.

## Postman

Postman es una herramienta grafica para probar, documentar y compartir APIs REST. Permite crear colecciones de peticiones HTTP organizadas por proyecto, guardar variables de entorno, escribir tests automaticos y exportar la coleccion como documentacion.

En este proyecto se uso Thunder Client, la version ligera de Postman integrada en VSCode, para verificar que los endpoints respondian correctamente con codigos 201, 204, 400, 404 y 500.

## Sentry

Sentry es una plataforma de monitorizacion de errores en produccion. Captura automaticamente cualquier excepcion no controlada, registra el stack trace completo y envia alertas en tiempo real por email o Slack.

## Swagger

Swagger es el estandar mas usado para documentar APIs REST. Genera una interfaz web interactiva donde cualquier desarrollador puede ver todos los endpoints disponibles y probarlos directamente desde el navegador sin necesidad de Postman.
