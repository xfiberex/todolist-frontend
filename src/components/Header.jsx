"use client"

// src/components/Header.jsx

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { auth, cerrarSesionAuth } = useAuth()
  const navigate = useNavigate()

  // Referencia al contenedor del menú para detectar clics fuera de él.
  const menuRef = useRef(null)

  // Cierra el menú desplegable si el usuario hace clic fuera de su contenedor.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    cerrarSesionAuth()
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <header
      className="relative z-[70] py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 
                          border-b border-slate-700/50 shadow-lg shadow-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo y título de la aplicación */}
        <Link
          to="/admin"
          className="flex items-center gap-3 font-bold text-2xl text-slate-200 
                             hover:text-white transition-all duration-300 group"
        >
          {/* El icono ahora es una imagen que apunta al SVG en la carpeta public */}
          <img
            src="/favicon.svg"
            alt="Logo de Gestor de Tareas"
            className="h-8 w-8 group-hover:scale-110 transition-transform duration-300"
          />
          Gestor de{" "}
          <span
            className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-black
                                   group-hover:from-teal-300 group-hover:to-cyan-400 transition-all duration-300"
          >
            Tareas
          </span>
        </Link>

        {/* Menú de usuario con avatar y desplegable */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-3 p-2 px-4 rounded-xl 
                                 hover:bg-slate-700/50 transition-all duration-300
                                 ring-2 ring-transparent hover:ring-teal-500/30
                                 hover:shadow-lg hover:shadow-teal-500/10 z-50"
          >
            <span className="font-bold text-white hidden sm:block">{`${auth.nombre} ${auth.apellido}`}</span>
            {/* Avatar con las iniciales del usuario */}
            <div
              className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 
                                      rounded-full flex items-center justify-center 
                                      font-bold text-white text-lg shadow-lg shadow-teal-500/30
                                      ring-2 ring-teal-400/20 transition-transform duration-300
                                      hover:scale-110"
            >
              {auth.nombre?.charAt(0).toUpperCase()}
              {auth.apellido?.charAt(0).toUpperCase()}
            </div>
          </button>

          {/* Contenido del menú desplegable */}
          {menuAbierto && (
            <div
              className="absolute right-0 mt-3 w-72 
                                      bg-gradient-to-br from-slate-800/95 to-slate-900/95 
                                      backdrop-blur-xl rounded-xl shadow-2xl 
                                      border border-slate-700/50 z-[60]
                                      animate-dropdown duration-200"
            >
              <nav className="p-2 animate-dropdown">
                <Link
                  to="/admin/perfil"
                  onClick={() => setMenuAbierto(false)}
                  className="block px-4 py-3 text-slate-300 rounded-lg 
                                             hover:bg-slate-700/50 hover:text-white
                                             transition-all duration-200 font-medium
                                             hover:translate-x-1"
                >
                  Editar Perfil
                </Link>
                <Link
                  to="/admin/cambiar-password-perfil"
                  onClick={() => setMenuAbierto(false)}
                  className="block px-4 py-3 text-slate-300 rounded-lg 
                                             hover:bg-slate-700/50 hover:text-white
                                             transition-all duration-200 font-medium
                                             hover:translate-x-1"
                >
                  Cambiar Contraseña
                </Link>
              </nav>

              <div className="border-t border-slate-700/50 p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-3 text-rose-400 rounded-lg 
                                             hover:bg-rose-500/10 hover:text-rose-300
                                             transition-all duration-200 font-medium
                                             hover:translate-x-1 ring-1 ring-transparent hover:ring-rose-500/30"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
