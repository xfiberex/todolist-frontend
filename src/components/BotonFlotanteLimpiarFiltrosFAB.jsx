"use client"

// src/components/BotonFlotanteLimpiarFiltrosFAB.jsx

const BotonFlotanteLimpiarFiltrosFAB = ({ onClick, visible = false }) => {
  if (!visible) return null
  return (
    <div className="md:hidden fixed bottom-42 right-6 z-50">
      <button
        type="button"
        onClick={onClick}
        className="relative bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-4 shadow-lg shadow-red-500/30 transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl hover:shadow-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-400/60 active:scale-95"
        aria-label="Limpiar filtros"
        title="Limpiar filtros"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default BotonFlotanteLimpiarFiltrosFAB
