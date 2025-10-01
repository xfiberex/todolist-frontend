// src/components/AdminNav.jsx

import { NavLink } from "react-router-dom";

const AdminNav = () => {
    return (
        <nav className="flex flex-col gap-2">
            <NavLink
                to="/admin/perfil"
                className={({ isActive }) =>
                    `font-bold px-4 py-3 rounded-lg transition-colors
                     ${isActive 
                        ? "bg-slate-700 text-teal-400" 
                        : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                     }`
                }
            >
                Editar Perfil
            </NavLink>

            <NavLink
                to="/admin/cambiar-password-perfil"
                className={({ isActive }) =>
                    `font-bold px-4 py-3 rounded-lg transition-colors
                     ${isActive 
                        ? "bg-slate-700 text-teal-400" 
                        : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                     }`
                }
            >
                Cambiar Contraseña
            </NavLink>
        </nav>
    );
};

export default AdminNav;