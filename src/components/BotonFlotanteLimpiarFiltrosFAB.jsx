// src/components/BotonFlotanteLimpiarFiltrosFAB.jsx

const BotonFlotanteLimpiarFiltrosFAB = ({ onClick, visible = false }) => {
    if (!visible) return null;
    return (
        <div className="md:hidden fixed bottom-42 right-6">
            <button
                type="button"
                onClick={onClick}
                className="relative bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400/60"
                aria-label="Limpiar filtros"
                title="Limpiar filtros"
            >
                {/* icono X */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default BotonFlotanteLimpiarFiltrosFAB;
