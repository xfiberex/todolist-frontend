"use client"

import useTareas from "../hooks/useTareas"
import formatearFecha from "../../helpers/formatearFecha.js"
import React, { memo } from "react"

const Tarea = React.forwardRef(({ tarea, style, dragAttributes, dragListeners }, ref) => {
  const { setEdicion, handleModalEliminar, cambiarEstadoTarea } = useTareas()
  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea

  // Priority badge styles for pending tasks
  const pendingPriorityBadgeStyles = {
    Baja: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 shadow-emerald-500/20",
    Media: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30 shadow-amber-500/20",
    Alta: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30 shadow-rose-500/20",
  }

  // Priority badge styles for completed tasks
  const completedPriorityBadgeStyles = {
    Baja: "bg-slate-700/50 text-slate-500 ring-1 ring-slate-600/30",
    Media: "bg-slate-700/50 text-slate-500 ring-1 ring-slate-600/30",
    Alta: "bg-slate-700/50 text-slate-500 ring-1 ring-slate-600/30",
  }

  const activeBadgeStyles = estado ? completedPriorityBadgeStyles : pendingPriorityBadgeStyles

  // Priority colors for border and accents
  const priorityColors = {
    Alta: "border-l-rose-500 shadow-rose-500/10",
    Media: "border-l-amber-500 shadow-amber-500/10",
    Baja: "border-l-emerald-500 shadow-emerald-500/10",
  }

  return (
    <div
      ref={ref}
      style={style}
      {...dragAttributes}
      className={`group relative mx-5 my-6 p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 
                           backdrop-blur-sm border rounded-xl overflow-hidden
                           transition-all duration-300 ease-out
                           hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
                           border-slate-700/50
                           border-l-4
                           ${estado ? "border-l-slate-600 shadow-lg" : `${priorityColors[prioridad]} shadow-lg`}
                           ${estado ? "opacity-60" : "opacity-100"}`}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative flex justify-between items-start gap-4">
        {/* Drag handle */}
        <div
          className="cursor-grab active:cursor-grabbing touch-none p-2.5 text-slate-600 
                                   hover:text-slate-400 hover:bg-slate-700/50 rounded-lg
                                   transition-all duration-200"
          {...dragListeners}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8h16M4 16h16" />
          </svg>
        </div>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              className={`font-bold text-xl leading-tight transition-all duration-300
                                ${estado ? "line-through text-slate-500" : "text-slate-50 group-hover:text-white"}`}
            >
              {nombre}
            </h3>

            <span
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold 
                                           uppercase tracking-wider shadow-sm transition-all duration-300
                                           ${activeBadgeStyles[prioridad]}`}
            >
              {prioridad}
            </span>
          </div>

          <p
            className={`text-slate-400 mb-4 leading-relaxed transition-colors duration-300
                                      ${estado ? "text-slate-500" : "group-hover:text-slate-300"}`}
          >
            {descripcion}
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium text-slate-300">{formatearFecha(fechaEntrega)}</span>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <button
              type="button"
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg 
                                           transition-all duration-300 shadow-sm
                                           ${
                                             estado
                                               ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 hover:shadow-emerald-500/40"
                                               : "bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white"
                                           }`}
              onClick={() => cambiarEstadoTarea(_id)}
            >
              {estado ? "✓ Completada" : "○ Incompleta"}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          {/* Edit button */}
          <button
            type="button"
            onClick={() => setEdicion(tarea)}
            className="p-2.5 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 
                                     rounded-lg transition-all duration-200 hover:scale-110
                                     ring-1 ring-transparent hover:ring-teal-500/30"
            aria-label="Editar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => handleModalEliminar(tarea)}
            className="p-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 
                                     rounded-lg transition-all duration-200 hover:scale-110
                                     ring-1 ring-transparent hover:ring-rose-500/30"
            aria-label="Eliminar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
})

Tarea.displayName = "Tarea"

export default memo(Tarea)
