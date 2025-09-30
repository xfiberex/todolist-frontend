// config/axios.jsx
import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Interceptor para inyectar el token en cada petición
clienteAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores de respuesta (como token expirado)
clienteAxios.interceptors.response.use(response => response, error => {
    // Si la respuesta es un error 401 (No autorizado)
    if (error.response && error.response.status === 401) {
        // Limpiamos localStorage y recargamos la página para ir al Login
        // Esta es la forma más simple de forzar el logout globalmente
        localStorage.removeItem('token');
        
        // Opcional: mostrar un mensaje
        sessionStorage.setItem('mensajePostLogout', 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        
        window.location.href = '/'; // Redirección forzada
    }
    
    // Rechazamos la promesa para que el .catch() en el componente se active si es necesario
    return Promise.reject(error);
});


export default clienteAxios;