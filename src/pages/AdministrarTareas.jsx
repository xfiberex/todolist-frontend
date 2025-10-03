// src/pages/AdministrarTareas.jsx

import useTareas from "../hooks/useTareas";
import ListadoTareas from "../components/ListaTareas";
import FiltrosTareas from "../components/FiltrosTareas";
import ModalGenerico from "../components/ModalGenerico";
import ModalFiltros from "../components/ModalFiltros";
import BotonFlotanteFAB from "../components/BotonFlotanteFAB";
import BotonFlotanteFiltroFAB from "../components/BotonFlotanteFiltroFAB";
import FormularioTareas from "../components/FormularioTarea";
import ModalEliminacion from "../components/ModalEliminacion";

const AdministrarTareas = () => {
    // Hooks de estado y contexto
    const {
        tarea,
        modalFormAbierto,
        handleAbrirModalForm,
        handleCerrarModalForm,
        modalFiltrosAbierto,
        handleAbrirModalFiltros,
        handleCerrarModalFiltros,
        modalEliminar,
        handleCloseModalEliminar,
        eliminarTarea,
        tareaAEliminar,
        cargandoEliminacion
    } = useTareas();

    // const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            {/* Controles superiores minimalistas (solo en desktop) */}
            <header className="mb-10">
                <div className="hidden md:flex md:justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={handleAbrirModalForm}
                        className="bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        <span>Añadir Nueva Tarea</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleAbrirModalFiltros}
                        className="bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:ring-slate-500/30 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out focus:outline-none shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        aria-label="Abrir filtros"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.6 4.8a1 1 0 00-.2.6V15l-4 2v-6c0-.2-.07-.4-.2-.6L3.2 4.6A1 1 0 013 4z" clipRule="evenodd" /></svg>
                        <span>Filtros</span>
                    </button>
                </div>
            </header>

            {/* Listado de Tareas */}
            <main>
                <ListadoTareas />
            </main>

            {/* Botones Flotantes para Móvil */}
            <BotonFlotanteFAB onClick={handleAbrirModalForm} />
            <BotonFlotanteFiltroFAB onClick={handleAbrirModalFiltros} />

            {/* Modal para Crear/Editar Tareas */}
            <ModalGenerico
                isOpen={modalFormAbierto}
                onClose={handleCerrarModalForm}
                title={tarea?._id ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
            >
                <FormularioTareas />
            </ModalGenerico>

            {/* Modal de Filtros (siempre disponible) */}
            <ModalFiltros
                isOpen={modalFiltrosAbierto}
                onClose={handleCerrarModalFiltros}
            >
                <FiltrosTareas variant="modal" />
            </ModalFiltros>
            
            {/* Modal de Eliminación */}
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