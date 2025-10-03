"use client"

import useTareas from "../hooks/useTareas"
import ListadoTareas from "../components/ListaTareas"
import FiltrosTareas from "../components/FiltrosTareas"
import ModalGenerico from "../components/ModalGenerico"
import ModalFiltros from "../components/ModalFiltros"
import BotonFlotanteFAB from "../components/BotonFlotanteFAB"
import BotonFlotanteFiltroFAB from "../components/BotonFlotanteFiltroFAB"
import BotonFlotanteLimpiarFiltrosFAB from "../components/BotonFlotanteLimpiarFiltrosFAB"
import FormularioTareas from "../components/FormularioTarea"
import ModalEliminacion from "../components/ModalEliminacion"

const AdministrarTareas = () => {
  const {
    tarea,
    modalFormAbierto,
    handleAbrirModalForm,
    handleCerrarModalForm,
    modalFiltrosAbierto,
    handleAbrirModalFiltros,
    handleCerrarModalFiltros,
    filtrosActivos,
    limpiarFiltros,
    modalEliminar,
    handleCloseModalEliminar,
    eliminarTarea,
    tareaAEliminar,
    cargandoEliminacion,
  } = useTareas()

  return (
    <>
      <header className="mb-10">
        <div className="hidden md:flex md:justify-end gap-3">
          <button
            type="button"
            onClick={handleAbrirModalForm}
            className="group relative bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 relative z-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="relative z-10">Añadir Nueva Tarea</span>
          </button>

          <button
            type="button"
            onClick={handleAbrirModalFiltros}
            className="group relative bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 flex items-center justify-center gap-2"
            aria-label="Abrir filtros"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.6 4.8a1 1 0 00-.2.6V15l-4 2v-6c0-.2-.07-.4-.2-.6L3.2 4.6A1 1 0 013 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Filtros</span>
            {filtrosActivos > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-6 min-w-[1.5rem] px-1.5 rounded-full text-xs font-bold bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse">
                {filtrosActivos}
              </span>
            )}
          </button>

          {filtrosActivos > 0 && (
            <button
              type="button"
              onClick={limpiarFiltros}
              className="group relative bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400/50 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-2 backdrop-blur-sm"
              aria-label="Limpiar filtros"
              title="Limpiar filtros"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 relative z-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative z-10">Limpiar</span>
            </button>
          )}
        </div>
      </header>

      <main>
        <ListadoTareas />
      </main>

      <BotonFlotanteFAB onClick={handleAbrirModalForm} />
      <BotonFlotanteFiltroFAB onClick={handleAbrirModalFiltros} badgeCount={filtrosActivos} />
      <BotonFlotanteLimpiarFiltrosFAB onClick={limpiarFiltros} visible={filtrosActivos > 0} />

      <ModalGenerico
        isOpen={modalFormAbierto}
        onClose={handleCerrarModalForm}
        title={tarea?._id ? "Editar Tarea" : "Añadir Nueva Tarea"}
      >
        <FormularioTareas />
      </ModalGenerico>

      <ModalFiltros isOpen={modalFiltrosAbierto} onClose={handleCerrarModalFiltros}>
        <FiltrosTareas variant="modal" />
      </ModalFiltros>

      <ModalEliminacion
        isOpen={modalEliminar}
        onClose={handleCloseModalEliminar}
        onConfirm={eliminarTarea}
        tareaNombre={tareaAEliminar?.nombre || ""}
        cargando={cargandoEliminacion}
      />
    </>
  )
}

export default AdministrarTareas
