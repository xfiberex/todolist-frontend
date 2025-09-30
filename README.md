# Frontend - Gestor de Tareas

Este directorio contiene el código fuente del frontend para la aplicación de gestión de tareas. Es una Single Page Application (SPA) construida con React, diseñada para ofrecer una experiencia de usuario fluida, moderna y responsive.

## ✨ Características Principales

*   **Interfaz Moderna**: Construida con React y estilizada con Tailwind CSS.
*   **Enrutamiento**: Gestión de rutas del lado del cliente con `react-router-dom`.
*   **Gestión de Estado Global**: Uso del Context API de React para manejar el estado de la autenticación y las tareas.
*   **Formularios Interactivos**: Formularios para registro, inicio de sesión y gestión de tareas.
*   **Rutas Protegidas**: Solo los usuarios autenticados pueden acceder al panel principal de tareas.
*   **Comunicación con API**: Utiliza `axios` para realizar peticiones HTTP al backend.
*   **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla, desde móviles hasta escritorio.

## 🛠️ Tecnologías Utilizadas

*   **React**: Biblioteca para construir interfaces de usuario.
*   **Vite**: Herramienta de desarrollo frontend rápida.
*   **React Router DOM**: Para el enrutamiento en la aplicación.
*   **Tailwind CSS**: Framework de CSS "utility-first" para un diseño rápido.
*   **Axios**: Cliente HTTP para realizar peticiones a la API.
*   **Context API**: Para la gestión del estado global.

## 🚀 Instalación y Puesta en Marcha

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2.  **Navegar al directorio del frontend:**
    ```bash
    cd Frontend
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

4.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del directorio `Frontend/` y añade la URL del backend:
    ```env
    VITE_BACKEND_URL=http://localhost:4000
    ```

5.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación se abrirá automáticamente en tu navegador, generalmente en `http://localhost:5173`.

## 📦 Build para Producción

Para crear una versión optimizada de la aplicación para producción, ejecuta:

```bash
npm run build
```
Esto generará los archivos estáticos en el directorio `dist/`, listos para ser desplegados en un servidor web.
