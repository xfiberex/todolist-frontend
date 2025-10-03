// src/components/AdminNav.jsx

import { NavLink } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/admin/perfil"
        className={({ isActive }) =>
          `font-bold px-4 py-3 rounded-lg transition-all duration-300
                     ${
                       isActive
                         ? "bg-gradient-to-r from-slate-700 to-slate-600 text-teal-400 shadow-lg shadow-slate-900/50"
                         : "text-slate-400 hover:bg-slate-700/50 hover:text-white hover:scale-[1.02] hover:shadow-md"
                     }`
        }
      >
        Editar Perfil
      </NavLink>

      <NavLink
        to="/admin/cambiar-password-perfil"
        className={({ isActive }) =>
          `font-bold px-4 py-3 rounded-lg transition-all duration-300
                     ${
                       isActive
                         ? "bg-gradient-to-r from-slate-700 to-slate-600 text-teal-400 shadow-lg shadow-slate-900/50"
                         : "text-slate-400 hover:bg-slate-700/50 hover:text-white hover:scale-[1.02] hover:shadow-md"
                     }`
        }
      >
        Cambiar Contraseña
      </NavLink>
    </nav>
  )
}

export default AdminNav
