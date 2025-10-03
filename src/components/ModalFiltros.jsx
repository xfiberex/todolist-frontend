// src/components/ModalFiltros.jsx

import ModalGenerico from "./ModalGenerico";

const ModalFiltros = ({ isOpen, onClose, children }) => {
    return (
        <ModalGenerico isOpen={isOpen} onClose={onClose} title="Filtrar y Ordenar">
            {/* Contenedor scrollable por si crece */}
            <div className="max-h-[70vh] overflow-y-auto pr-1">
                {children}
            </div>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Cerrar
                </button>
            </div>
        </ModalGenerico>
    );
};

export default ModalFiltros;
