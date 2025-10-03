"use client"

// src/components/FAB.jsx

const BotonFlotanteFAB = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-full p-4 shadow-lg shadow-teal-500/30 transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40 focus:outline-none focus:ring-4 focus:ring-teal-400/60 active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}

export default BotonFlotanteFAB
