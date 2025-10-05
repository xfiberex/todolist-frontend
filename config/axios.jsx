// config/axios.jsx
import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Inyectar token en cada request
clienteAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejar 401 global (token expirado/no válido)
clienteAxios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        // Forzar logout simple
        localStorage.removeItem('token');
        sessionStorage.setItem('mensajePostLogout', 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        window.location.href = '/';
    }
    return Promise.reject(error);
});


export default clienteAxios;