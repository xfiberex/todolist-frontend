import useTareas from "../hooks/useTareas";
import formatearFecha from "../../helpers/formatearFecha.js";
import React, { memo } from "react";

const Tarea = React.forwardRef(
    ({ tarea, style, dragAttributes, dragListeners }, ref) => {
        const { setEdicion, eliminarTarea, cambiarEstadoTarea } = useTareas();
        const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } =
            tarea;

        // 1. ESTILOS ORIGINALES PARA TAREAS PENDIENTES (VIBRANTES)
        const pendingPriorityBadgeStyles = {
            Baja: "bg-green-900/50 text-green-300 ring-1 ring-inset ring-green-300/20",
            Media: "bg-yellow-900/50 text-yellow-300 ring-1 ring-inset ring-yellow-300/20",
            Alta: "bg-red-900/50 text-red-300 ring-1 ring-inset ring-red-300/20",
        };

        // 2. NUEVOS ESTILOS PARA TAREAS COMPLETADAS (OPACOS / DESATURADOS)
        // Usan tonos de gris para indicar que ya no son una prioridad activa.
        const completedPriorityBadgeStyles = {
            Baja: "bg-slate-700 text-slate-400 ring-1 ring-inset ring-slate-500/20",
            Media: "bg-slate-700 text-slate-400 ring-1 ring-inset ring-slate-500/20",
            Alta: "bg-slate-700 text-slate-400 ring-1 ring-inset ring-slate-500/20",
        };

        // Se elige qué conjunto de estilos usar basado en el estado de la tarea.
        const activeBadgeStyles = estado
            ? completedPriorityBadgeStyles
            : pendingPriorityBadgeStyles;

        return (
            // El borde izquierdo refleja la prioridad
            <div
                ref={ref}
                style={style}
                {...dragAttributes}
                className={`mx-5 my-8 p-5 bg-slate-800 border rounded-lg overflow-hidden
                           transition-all hover:shadow-lg hover:shadow-teal-900/20
                           border-slate-700
                           border-l-8 
                           ${
                               estado
                                   ? "border-l-slate-600"
                                   : prioridad === "Alta"
                                   ? "border-l-red-500"
                                   : prioridad === "Media"
                                   ? "border-l-yellow-500"
                                   : "border-l-green-500"
                           }
                           ${estado ? "opacity-70" : "opacity-100"}`}
            >
                <div className="flex justify-between items-start gap-4">
                    <div
                        className="cursor-grab touch-none p-2 text-slate-500 hover:text-slate-300"
                        {...dragListeners}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </div>

                    {/* Información de la tarea */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                            {/* 4. MEJORA DE UX: Se tacha el nombre si la tarea está completada */}
                            <p
                                className={`font-bold text-xl transition-colors
                                ${
                                    estado
                                        ? "line-through text-slate-500"
                                        : "text-slate-100"
                                }`}
                            >
                                {nombre}
                            </p>

                            {/* Se usan los estilos activos (vibrantes u opacos) */}
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${activeBadgeStyles[prioridad]}`}
                            >
                                {prioridad}
                            </span>
                        </div>

                        <p className="text-slate-300 mb-2">{descripcion}</p>
                        <p className="text-sm text-slate-400">
                            <span className="font-semibold text-slate-300">
                                Fecha de Entrega:{" "}
                            </span>
                            {formatearFecha(fechaEntrega)}
                        </p>

                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <button
                                type="button"
                                className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors ${
                                    estado
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-slate-600 hover:bg-slate-700"
                                }`}
                                onClick={() => cambiarEstadoTarea(_id)}
                            >
                                {estado ? "Completada" : "Incompleta"}
                            </button>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col space-y-3">
                        {/* Editar */}
                        <button
                            type="button"
                            onClick={() => setEdicion(tarea)}
                            className="p-2 text-teal-500 hover:bg-teal-900/50 rounded-full transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Eliminar */}
                        <button
                            type="button"
                            onClick={() => eliminarTarea(_id)}
                            className="p-2 text-red-500 hover:bg-red-900/50 rounded-full transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
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
        );
    }
);

export default memo(Tarea);
