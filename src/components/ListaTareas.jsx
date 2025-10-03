import { useMemo, useState } from "react"; // 1. Importar useState
import useTareas from "../hooks/useTareas";
import Tarea from "./Tarea";

// 2. Importar DragOverlay
import {
    DndContext,
    DragOverlay, // <-- Importante
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const SortableTareaItem = ({ tarea }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging, // <-- Esta propiedad es clave
    } = useSortable({ id: tarea._id });

    // 3. MODIFICACIÓN CLAVE: Ocultar el elemento original mientras se arrastra
    // El DragOverlay se encargará de mostrar la tarea que sigue al puntero.
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // Si isDragging es true, el elemento original se vuelve invisible.
        // Ocupará su espacio, pero no se verá, evitando la "distorsión".
        opacity: isDragging ? 0 : 1,
    };

    return (
        <Tarea
            ref={setNodeRef}
            style={style}
            tarea={tarea}
            dragAttributes={attributes}
            dragListeners={listeners}
        />
    );
};


const ListaTareas = () => {
    const { tareas, reordenarTareas, filtrosActivos, limpiarFiltros, handleAbrirModalFiltros } = useTareas();

    // 4. NUEVO ESTADO: Para guardar la tarea que se está arrastrando activamente
    const [activeTarea, setActiveTarea] = useState(null);

    const tareasPendientes = useMemo(
        () => tareas.filter((tarea) => !tarea.estado),
        [tareas]
    );
    const tareasCompletadas = useMemo(
        () => tareas.filter((tarea) => tarea.estado),
        [tareas]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // 5. NUEVO MANEJADOR: onDragStart
    // Se ejecuta en cuanto comienza el arrastre.
    const handleDragStart = (event) => {
        const { active } = event;
        // Buscamos la tarea completa por su ID y la guardamos en el estado.
        const tarea = tareas.find((t) => t._id === active.id);
        setActiveTarea(tarea);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        // Si no se soltó sobre un área válida, o es el mismo lugar, no hacemos nada.
        if (over && active.id !== over.id) {
            const oldIndex = tareas.findIndex((t) => t._id === active.id);
            const newIndex = tareas.findIndex((t) => t._id === over.id);

            const tareasReordenadas = arrayMove(tareas, oldIndex, newIndex);
            reordenarTareas(tareasReordenadas);
        }

        // 6. Limpiamos el estado al finalizar el arrastre.
        // Esto hará que el DragOverlay desaparezca.
        setActiveTarea(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart} // <-- Añadido
            onDragEnd={handleDragEnd}
        >
            <>
                <h2 className="font-black text-4xl text-slate-100 text-center">
                    Tareas Pendientes
                </h2>
                <p className="text-xl mt-5 mb-10 text-center text-slate-300">
                    Administra tus
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold"> tareas y proyectos</span>
                </p>

                <SortableContext
                    items={tareasPendientes.map((t) => t._id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {tareasPendientes.map((tarea) => (
                            <SortableTareaItem key={tarea._id} tarea={tarea} />
                        ))}
                    </div>
                </SortableContext>

                {tareasCompletadas.length > 0 && (
                    <div className="my-10 pt-10 border-t border-slate-700">
                        <h2 className="font-black text-4xl text-slate-100 text-center">
                            Tareas Completadas
                        </h2>
                        <p className="text-xl mt-5 mb-10 text-center text-slate-300">
                            Revisa tus tareas
                            <span className="text-green-400 font-bold"> finalizadas</span>
                        </p>
                        <SortableContext
                            items={tareasCompletadas.map((t) => t._id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">
                                {tareasCompletadas.map((tarea) => (
                                    <SortableTareaItem
                                        key={tarea._id}
                                        tarea={tarea}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </div>
                )}

                {tareas.length === 0 && (
                    filtrosActivos > 0 ? (
                        <div className="text-center mt-20">
                            <p className="text-slate-300 mb-6">
                                No hay tareas que coincidan con los filtros aplicados.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={limpiarFiltros}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg"
                                >
                                    Limpiar filtros
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAbrirModalFiltros}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded-lg"
                                >
                                    Ajustar filtros
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center mt-20 text-slate-400">
                            Comienza agregando una tarea
                            <span className="text-teal-400 font-bold"> y aparecerá en este lugar</span>
                        </p>
                    )
                )}
            </>
            
            {/* 7. AQUÍ ESTÁ LA MAGIA: El DragOverlay */}
            {/* Se renderizará solo cuando activeTarea no sea null. */}
            <DragOverlay>
                {activeTarea ? (
                    // Renderizamos un componente Tarea normal, sin props de dnd.
                    // Esto es lo que el usuario verá "pegado" a su cursor.
                    <Tarea tarea={activeTarea} />
                ) : null}
            </DragOverlay>

        </DndContext>
    );
};

export default ListaTareas;