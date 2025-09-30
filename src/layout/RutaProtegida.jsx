// src/layout/RutaProtegida.jsx

import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    // Muestra una animación de carga a pantalla completa mientras se verifica la autenticación.
    if (cargando) {
        return (
            <div className="bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-700 border-t-teal-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            {auth?._id ? (
                // Contenedor principal del layout para la vista autenticada.
                <div className="bg-slate-900 min-h-screen flex flex-col">
                    <Header />
                    {/* El contenido principal crece para empujar el footer hacia abajo. */}
                    <main className="container mx-auto mt-10 px-4 flex-grow">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            ) : (
                // Si no está autenticado, se redirige al inicio de sesión.
                <Navigate to="/" />
            )}
        </>
    );
};

export default RutaProtegida;
