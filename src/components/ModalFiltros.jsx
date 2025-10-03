"use client"

// src/components/ModalFiltros.jsx

import ModalGenerico from "./ModalGenerico"

const ModalFiltros = ({ isOpen, onClose, children }) => {
  return (
    <ModalGenerico isOpen={isOpen} onClose={onClose} title="Filtrar y Ordenar">
      {/* Contenedor scrollable por si crece */}
      <div
        className="max-h-[70vh] overflow-y-auto pr-1 
                          scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50"
      >
        {children}
      </div>
      <div className="flex justify-end mt-6 pt-4 border-t border-slate-700/50">
        <button
          type="button"
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold 
                             py-3 px-6 rounded-xl transition-all duration-300
                             transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Cerrar
        </button>
      </div>
    </ModalGenerico>
  )
}

export default ModalFiltros
