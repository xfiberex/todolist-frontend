// src/components/Header.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { auth, cerrarSesionAuth } = useAuth();
    const navigate = useNavigate();

    // Referencia al contenedor del menú para detectar clics fuera de él.
    const menuRef = useRef(null);

    // Cierra el menú desplegable si el usuario hace clic fuera de su contenedor.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        cerrarSesionAuth();
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="py-6 bg-slate-800 border-b border-slate-700">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo y título de la aplicación */}
                <Link
                    to="/admin"
                    className="flex items-center gap-3 font-bold text-2xl text-slate-200"
                >
                    {/* El icono ahora es una imagen que apunta al SVG en la carpeta public */}
                    <img
                        src="/favicon.svg"
                        alt="Logo de Gestor de Tareas"
                        className="h-8 w-8" // Controla el tamaño con Tailwind
                    />
                    Gestor de{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-black">
                        Tareas
                    </span>
                </Link>

                {/* Menú de usuario con avatar y desplegable */}
                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="flex items-center gap-2 p-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        <span className="font-bold text-white hidden sm:block">{`${auth.nombre} ${auth.apellido}`}</span>
                        {/* Avatar con las iniciales del usuario */}
                        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
                            {auth.nombre?.charAt(0).toUpperCase()}
                            {auth.apellido?.charAt(0).toUpperCase()}
                        </div>
                    </button>

                    {/* Contenido del menú desplegable */}
                    {menuAbierto && (
                        <div className="absolute right-0 mt-2 w-72 bg-slate-700 rounded-lg shadow-xl border border-slate-600 z-10">
                            {/* OPCIONAL PARA MOSTRAR NOMBRE Y CORREO EN EL MENU DESPLEGABLE */}
                            {/* <div className="border-b border-slate-600 p-4">
                                <p className="font-bold text-white text-lg">{`${auth.nombre} ${auth.apellido}`}</p>
                                <p className="text-sm text-slate-400">
                                    {auth.email}
                                </p>
                            </div> */}

                            <nav className="p-2">
                                <Link
                                    to="/admin/perfil"
                                    onClick={() => setMenuAbierto(false)}
                                    className="block px-4 py-2 text-slate-300 rounded-md hover:bg-slate-600 hover:text-white"
                                >
                                    Editar Perfil
                                </Link>
                                <Link
                                    to="/admin/cambiar-password-perfil"
                                    onClick={() => setMenuAbierto(false)}
                                    className="block px-4 py-2 text-slate-300 rounded-md hover:bg-slate-600 hover:text-white"
                                >
                                    Cambiar Contraseña
                                </Link>
                            </nav>

                            <div className="border-t border-slate-600 p-2">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-2 text-red-400 rounded-md hover:bg-slate-600 hover:text-red-300"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;