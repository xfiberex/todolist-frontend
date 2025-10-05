"use client"

// src/components/FiltrosTareas.jsx

import { useState, useEffect } from "react"
import useTareas from "../hooks/useTareas"

const FiltrosTareas = ({ variant = "panel" }) => {
  const {
    setBusqueda,
    setFiltroFechaDesde,
    setFiltroFechaHasta,
    setFiltroPrioridad,
    setOrden,
    limpiarFiltros,
    filtros,
  } = useTareas()

  const [busquedaLocal, setBusquedaLocal] = useState(filtros.busqueda)

  useEffect(() => {
    const handler = setTimeout(() => {
      setBusqueda(busquedaLocal)
    }, 300)
    return () => clearTimeout(handler)
  }, [busquedaLocal, setBusqueda])

  useEffect(() => {
    setBusquedaLocal(filtros.busqueda)
  }, [filtros.busqueda])

  // --- Layout modal (vertical, con etiquetas) ---
  if (variant === "modal") {
    return (
      <div className="space-y-5">
        <div>
          <label className="block text-slate-300 font-semibold mb-2">Buscar</label>
          <input
            type="text"
            placeholder="Nombre o descripción..."
            className="w-full rounded-lg p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 focus:bg-slate-900/70 transition-all duration-300"
            value={busquedaLocal}
            onChange={(e) => setBusquedaLocal(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2">Prioridad</label>
          <select
            className="w-full rounded-lg p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white appearance-none focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 focus:bg-slate-900/70 transition-all duration-300 cursor-pointer"
            value={filtros.prioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Desde</label>
            <input
              type="date"
              className="w-full rounded-lg p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 
                       text-white focus:outline-none focus:border-teal-500/50 focus:ring-2 
                       focus:ring-teal-500/30 focus:bg-slate-900/70 transition-all duration-300 cursor-pointer"
              value={filtros.fechaDesde}
              onChange={(e) => setFiltroFechaDesde(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Hasta</label>
            <input
              type="date"
              className="w-full rounded-lg p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 focus:bg-slate-900/70 transition-all duration-300 cursor-pointer"
              value={filtros.fechaHasta}
              onChange={(e) => setFiltroFechaHasta(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2">Orden</label>
          <select
            className="w-full rounded-lg p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white appearance-none focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 focus:bg-slate-900/70 transition-all duration-300 cursor-pointer"
            value={filtros.orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="orden-manual">Orden Personalizado (Arrastrar)</option>
            <option value="fecha-asc">Fecha (Ascendente)</option>
            <option value="fecha-desc">Fecha (Descendente)</option>
            <option value="prioridad-asc">Prioridad (Alta a Baja)</option>
            <option value="prioridad-desc">Prioridad (Baja a Alta)</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            onClick={limpiarFiltros}
            className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 
            text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-slate-900/50 transition-all duration-300 
            hover:shadow-xl"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    )
  }

  // --- Layout por defecto (panel horizontal) ---
  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/30 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.6 4.8a1 1 0 00-.2.6V15l-4 2v-6c0-.2-.07-.4-.2-.6L3.2 4.6A1 1 0 013 4z"
              clipRule="evenodd"
            />
          </svg>
          Filtrar y Ordenar Tareas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              className="w-full rounded-lg p-2.5 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 transition-all duration-300"
              value={busquedaLocal}
              onChange={(e) => setBusquedaLocal(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full rounded-lg p-2.5 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white appearance-none focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 transition-all duration-300 cursor-pointer"
              value={filtros.prioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
            >
              <option value="todas">Todas las prioridades</option>
              <option value="Alta">Prioridad Alta</option>
              <option value="Media">Prioridad Media</option>
              <option value="Baja">Prioridad Baja</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="w-full rounded-lg p-2.5 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 transition-all duration-300 cursor-pointer"
              value={filtros.fechaDesde}
              onChange={(e) => setFiltroFechaDesde(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              className="w-full rounded-lg p-2.5 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 transition-all duration-300 cursor-pointer"
              value={filtros.fechaHasta}
              onChange={(e) => setFiltroFechaHasta(e.target.value)}
            />
          </div>

          <div className="lg:col-span-2">
            <select
              className="w-full rounded-lg p-2.5 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white appearance-none focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/30 transition-all duration-300 cursor-pointer"
              value={filtros.orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="orden-manual">Orden Personalizado (Arrastrar)</option>
              <option value="fecha-asc">Fecha de Entrega (Ascendente)</option>
              <option value="fecha-desc">Fecha de Entrega (Descendente)</option>
              <option value="prioridad-asc">Prioridad (Alta a Baja)</option>
              <option value="prioridad-desc">Prioridad (Baja a Alta)</option>
            </select>
          </div>

          <div className="lg:col-span-3 flex items-end">
            <button
              onClick={limpiarFiltros}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-2.5 px-6 rounded-lg w-full md:w-auto shadow-lg shadow-slate-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltrosTareas
