# Decameron Front

### Nota importante: Antes de configurar este proyecto, por favor debe haber configurado antes https://github.com/joseiguti/decameron-api

Este proyecto es una aplicación para la gestión de hoteles, permitiendo a los usuarios registrar información de hoteles, incluyendo su nombre, dirección, ciudad, NIT, y detalles sobre las habitaciones disponibles.

Características

- Registro de información básica del hotel, como nombre, dirección, ciudad y NIT.
- Gestión de habitaciones del hotel, incluyendo el número total de habitaciones y sus detalles.
- Posibilidad de agregar y eliminar campos dinámicos para ingresar información detallada de cada habitación, como tipo de habitación y acomodación.
- Validación de datos para asegurar la integridad de la información ingresada.
- Envío de datos al servidor a través de una solicitud POST para su almacenamiento.

### Requisitos del sistema

- Node.js
- NPM

### Configuración del proyecto

1. Clona el repositorio del proyecto:

```bash
git clone https://github.com/joseiguti/decameron-front.git
```

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Configura el servidor de API:

- Abre el archivo src/main.js.

- Busca la línea que contiene la URL del servidor y modifícala según sea necesario, si el api está usando otro puerto:
```javascript
const serverUrl = 'http://localhost:8000/api/hotels';
```

### Inicia la aplicación:

```bash
npm run serve
```

Accede a la aplicación en tu navegador:

http://localhost:8080

### Demo
https://youtu.be/mmcV2Q-PMRw

### Contribuciones

Las contribuciones al proyecto son bienvenidas. Si deseas colaborar, sigue estos pasos:

- Crea un fork del repositorio.
- Crea una rama para tu función o corrección de errores: git checkout -b nombre-rama.
- Realiza los cambios necesarios y realiza los commits: git commit -m "Descripción de los cambios".
- Envía los cambios a tu repositorio remoto: git push origin nombre-rama.
- Abre un pull request en el repositorio original.

Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con el equipo de desarrollo en me@joseiguti.com.