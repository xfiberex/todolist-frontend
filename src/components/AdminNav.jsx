import { NavLink } from "react-router-dom";

const AdminNav = () => {
    return (
        <nav
            // NUEVO: Se añade un contenedor con borde inferior para enmarcar la navegación
            className="flex gap-6 justify-center border-b border-slate-700 pb-5"
        >
            <NavLink
                to="/admin/perfil"
                // NUEVO: Clases para el tema oscuro. 'isActive' viene de NavLink y nos permite
                // aplicar un estilo diferente cuando la ruta está activa.
                className={({ isActive }) =>
                    `font-bold uppercase text-slate-400 hover:text-teal-400 transition-colors
                     ${isActive ? "text-teal-400" : ""}`
                }
            >
                Perfil
            </NavLink>

            <NavLink
                to="/admin/cambiar-password-perfil"
                className={({ isActive }) =>
                    `font-bold uppercase text-slate-400 hover:text-teal-400 transition-colors
                     ${isActive ? "text-teal-400" : ""}`
                }
            >
                Cambiar Contraseña
            </NavLink>
        </nav>
    );
};

export default AdminNav;
