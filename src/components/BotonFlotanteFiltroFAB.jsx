"use client"

// src/components/BotonFlotanteFiltroFAB.jsx

const BotonFlotanteFiltroFAB = ({ onClick, badgeCount = 0 }) => {
  const hasBadge = Number(badgeCount) > 0
  return (
    <div className="md:hidden fixed bottom-24 right-6 z-50">
      <button
        type="button"
        onClick={onClick}
        className="relative bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-full p-4 shadow-lg shadow-slate-900/50 transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-400/60 active:scale-95"
        aria-label="Abrir filtros"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.6 4.8a1 1 0 00-.2.6V15l-4 2v-6c0-.2-.07-.4-.2-.6L3.2 4.6A1 1 0 013 4z"
            clipRule="evenodd"
          />
        </svg>
        {hasBadge && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full text-xs font-bold bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50 animate-pulse">
            {badgeCount}
          </span>
        )}
      </button>
    </div>
  )
}

export default BotonFlotanteFiltroFAB
