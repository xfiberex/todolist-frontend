import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";

// --- Creación de Contexto con Autenticación ---
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // --- Estados para la Carga y Autenticación ---
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    // --- Efectos para la revisión del usuario al autenticarse ---
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            // Si no hay token detiene la ejecución del codigo
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clienteAxios.get(
                    "/usuarios/perfil",
                    config
                );

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        };
        autenticarUsuario();
    }, []);

    // --- Funciones ---
    const cerrarSesionAuth = () => {
        // Limpiamos el token y la info de autenticación
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await clienteAxios.put(
                `/usuarios/perfil`,
                datos,
                config
            );

            // Sincronizar el estado de auth con los datos actualizados devueltos por el backend
            if (data?.usuario) {
                setAuth(prevAuth => ({ ...prevAuth, ...data.usuario }));
            }

            return {
                msg: data?.msg || "Almacenado correctamente",
                error: false,
                emailCambiado: !!data?.emailCambiado,
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    const actualizarPasswordPerfil = async (datos) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await clienteAxios.put(
                "/usuarios/actualizar-password-perfil",
                datos,
                config
            );

            return {
                msg: data.msg,
                error: false,
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth,
                actualizarPerfil,
                actualizarPasswordPerfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;