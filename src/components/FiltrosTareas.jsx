// src/components/FiltrosTareas.jsx

import { useState, useEffect } from "react";
import useTareas from "../hooks/useTareas";

const FiltrosTareas = () => {
    const { 
        setBusqueda, 
        setFiltroFechaDesde, 
        setFiltroFechaHasta, 
        setFiltroPrioridad, 
        setOrden, 
        limpiarFiltros,
        filtros
    } = useTareas();

    const [busquedaLocal, setBusquedaLocal] = useState(filtros.busqueda);

    // Efecto para aplicar debounce a la búsqueda
    useEffect(() => {
        const handler = setTimeout(() => {
            setBusqueda(busquedaLocal);
        }, 300);
        return () => clearTimeout(handler);
    }, [busquedaLocal, setBusqueda]);
    
    // ---- CORRECCIÓN ----
    // Este efecto sincroniza el estado local de la búsqueda (busquedaLocal)
    // con el estado global del contexto (filtros.busqueda). Es necesario para que
    // el campo de texto se vacíe visualmente cuando se hace clic en "Limpiar Filtros".
    useEffect(() => {
        setBusquedaLocal(filtros.busqueda);
    }, [filtros.busqueda]);

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-10">
            <h3 className="font-bold text-xl text-white mb-4">Filtrar y Ordenar Tareas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Búsqueda */}
                <div className="lg:col-span-2">
                    <input 
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        className="w-full rounded-md p-2 bg-slate-900 border border-slate-700 text-white
                                   focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        value={busquedaLocal}
                        onChange={e => setBusquedaLocal(e.target.value)}
                    />
                </div>
                
                {/* Prioridad */}
                <div>
                    <select
                        className="w-full rounded-md p-2 bg-slate-900 border border-slate-700 text-white"
                        value={filtros.prioridad} 
                        onChange={e => setFiltroPrioridad(e.target.value)}
                    >
                        <option value="todas">Todas las prioridades</option>
                        <option value="Alta">Prioridad Alta</option>
                        <option value="Media">Prioridad Media</option>
                        <option value="Baja">Prioridad Baja</option>
                    </select>
                </div>

                {/* Fechas */}
                <div>
                    <input type="date" className="w-full rounded-md p-2 bg-slate-900 border border-slate-700 text-white" 
                           value={filtros.fechaDesde} onChange={e => setFiltroFechaDesde(e.target.value)} />
                </div>
                <div>
                    <input type="date" className="w-full rounded-md p-2 bg-slate-900 border border-slate-700 text-white"
                           value={filtros.fechaHasta} onChange={e => setFiltroFechaHasta(e.target.value)} />
                </div>

                {/* Orden */}
                <div className="lg:col-span-2">
                    <select
                        className="w-full rounded-md p-2 bg-slate-900 border border-slate-700 text-white"
                        value={filtros.orden}
                        onChange={e => setOrden(e.target.value)}
                    >
                        <option value="fecha-asc">Fecha de Entrega (Ascendente)</option>
                        <option value="fecha-desc">Fecha de Entrega (Descendente)</option>
                        <option value="prioridad-asc">Prioridad (Alta a Baja)</option>
                        <option value="prioridad-desc">Prioridad (Baja a Alta)</option>
                    </select>
                </div>

                {/* Limpiar */}
                <div className="lg:col-span-3 flex items-end">
                    <button 
                        onClick={limpiarFiltros}
                        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltrosTareas;