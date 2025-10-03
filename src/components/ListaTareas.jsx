"use client"

import { useMemo, useState } from "react"
import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea"

import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const SortableTareaItem = ({ tarea }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tarea._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return <Tarea ref={setNodeRef} style={style} tarea={tarea} dragAttributes={attributes} dragListeners={listeners} />
}

const ListaTareas = () => {
  const { tareas, reordenarTareas, filtrosActivos, limpiarFiltros, handleAbrirModalFiltros } = useTareas()

  const [activeTarea, setActiveTarea] = useState(null)

  const tareasPendientes = useMemo(() => tareas.filter((tarea) => !tarea.estado), [tareas])
  const tareasCompletadas = useMemo(() => tareas.filter((tarea) => tarea.estado), [tareas])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    const tarea = tareas.find((t) => t._id === active.id)
    setActiveTarea(tarea)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tareas.findIndex((t) => t._id === active.id)
      const newIndex = tareas.findIndex((t) => t._id === over.id)

      const tareasReordenadas = arrayMove(tareas, oldIndex, newIndex)
      reordenarTareas(tareasReordenadas)
    }

    setActiveTarea(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <>
        <h2 className="font-black text-4xl text-slate-50 text-center mb-2">Tareas Pendientes</h2>
        <p className="text-xl mt-3 mb-10 text-center text-slate-300 leading-relaxed">
          Administra tus
          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-black">
            {" "}
            tareas y proyectos
          </span>
        </p>

        <SortableContext items={tareasPendientes.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tareasPendientes.map((tarea) => (
              <SortableTareaItem key={tarea._id} tarea={tarea} />
            ))}
          </div>
        </SortableContext>

        {tareasCompletadas.length > 0 && (
          <div className="my-10 pt-10 border-t border-slate-700/50">
            <h2 className="font-black text-4xl text-slate-50 text-center mb-2">Tareas Completadas</h2>
            <p className="text-xl mt-3 mb-10 text-center text-slate-300 leading-relaxed">
              Revisa tus tareas
              <span className="text-emerald-400 font-black"> finalizadas</span>
            </p>
            <SortableContext items={tareasCompletadas.map((t) => t._id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {tareasCompletadas.map((tarea) => (
                  <SortableTareaItem key={tarea._id} tarea={tarea} />
                ))}
              </div>
            </SortableContext>
          </div>
        )}

        {tareas.length === 0 &&
          (filtrosActivos > 0 ? (
            <div className="text-center mt-20 p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
              <p className="text-slate-300 mb-6 text-lg">No hay tareas que coincidan con los filtros aplicados.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="bg-gradient-to-r from-rose-600 to-rose-700 
                                             hover:from-rose-700 hover:to-rose-800
                                             text-white font-bold py-3 px-6 rounded-xl
                                             transition-all duration-300 transform hover:scale-105
                                             shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40"
                >
                  Limpiar filtros
                </button>
                <button
                  type="button"
                  onClick={handleAbrirModalFiltros}
                  className="bg-slate-700 hover:bg-slate-600 
                                             text-white font-bold py-3 px-6 rounded-xl
                                             transition-all duration-300 transform hover:scale-105
                                             shadow-lg hover:shadow-xl"
                >
                  Ajustar filtros
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center mt-20 text-slate-400 text-lg">
              Comienza agregando una tarea
              <span className="text-teal-400 font-bold"> y aparecerá en este lugar</span>
            </p>
          ))}
      </>

      <DragOverlay>{activeTarea ? <Tarea tarea={activeTarea} /> : null}</DragOverlay>
    </DndContext>
  )
}

export default ListaTareas
