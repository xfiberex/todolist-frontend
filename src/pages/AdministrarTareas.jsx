// src/pages/AdministrarTareas.jsx

import useTareas from "../hooks/useTareas";
import useMediaQuery from "../hooks/useMediaQuery"; 
import ListadoTareas from "../components/ListaTareas";
import FiltrosTareas from "../components/FiltrosTareas";
import ModalGenerico from "../components/ModalGenerico";
import BotonFlotanteFAB from "../components/BotonFlotanteFAB";
import FormularioTareas from "../components/FormularioTarea";
import ModalEliminacion from "../components/ModalEliminacion";

const AdministrarTareas = () => {
    // Hooks de estado y contexto
    const {
        tarea,
        modalFormAbierto,
        handleAbrirModalForm,
        handleCerrarModalForm,
        modalEliminar,
        handleCloseModalEliminar,
        eliminarTarea,
        tareaAEliminar,
        cargandoEliminacion
    } = useTareas();

    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            {/* Encabezado Principal de la Página */}
            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-4xl font-black text-slate-100">Mis Tareas</h1>
                    {isDesktop && (
                        <button 
                            type="button" 
                            onClick={handleAbrirModalForm}
                            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            <span>Añadir Nueva Tarea</span>
                        </button>
                    )}
                </div>
                
                {/* Panel de Filtros */}
                <div className="mt-8">
                    <FiltrosTareas />
                </div>
            </header>

            {/* Listado de Tareas */}
            <main>
                <ListadoTareas />
            </main>

            {/* Botón Flotante para Móvil */}
            <BotonFlotanteFAB onClick={handleAbrirModalForm} />

            {/* Modal para Crear/Editar Tareas */}
            <ModalGenerico
                isOpen={modalFormAbierto}
                onClose={handleCerrarModalForm}
                title={tarea?._id ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
            >
                <FormularioTareas />
            </ModalGenerico>
            
            {/* Modal de Eliminación (sin cambios) */}
            <ModalEliminacion 
                isOpen={modalEliminar}
                onClose={handleCloseModalEliminar}
                onConfirm={eliminarTarea}
                tareaNombre={tareaAEliminar?.nombre || ''}
                cargando={cargandoEliminacion}
            />
        </>
    );
};

export default AdministrarTareas;