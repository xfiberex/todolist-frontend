// src/components/Boton.jsx

// --- Boton de Cancelación o Secundario ---
export const BotonCancelacion = ({ children, ...props }) => {
  return (
    <button
      className="w-full md:w-auto bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 focus:ring-4 focus:ring-slate-300/50
                       text-white font-bold py-3 px-10 rounded-lg mt-5
                       transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-0.5
                       focus:outline-none shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60
                       disabled:bg-gray-400 disabled:scale-100 disabled:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none disabled:from-gray-400 disabled:to-gray-400
                       active:scale-95"
      {...props}
    >
      {children}
    </button>
  )
}

// --- Boton Primario ---
const Boton = ({ children, type = "submit", disabled = false, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 focus:ring-4 focus:ring-teal-300/50
                       text-white font-bold py-3 px-10 rounded-lg mt-5
                       transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-0.5
                       focus:outline-none shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40
                       disabled:bg-gray-400 disabled:scale-100 disabled:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none disabled:from-gray-400 disabled:to-gray-400
                       active:scale-95"
      {...props}
    >
      {children}
    </button>
  )
}

export default Boton
