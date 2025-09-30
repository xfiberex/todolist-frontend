// src/components/Boton.jsx

// --- Boton de Cancelación o Secundario ---
// Se actualiza a tonos 'slate' para mayor consistencia.
export const BotonCancelacion = ({ children, ...props }) => {
    return (
        <button
            className="w-full md:w-auto bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:ring-slate-300
                       text-white font-bold py-3 px-10 rounded-lg mt-5
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none shadow-md hover:shadow-lg
                       disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
            {...props}
        >
            {children}
        </button>
    );
};

// --- Boton Primario ---
// NUEVO: Se actualiza de 'indigo' a 'teal' y se añaden efectos de sombra.
const Boton = ({ children, type = "submit", disabled = false, ...props }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300
                       text-white font-bold py-3 px-10 rounded-lg mt-5
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none shadow-md hover:shadow-lg
                       disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
            {...props}
        >
            {children}
        </button>
    );
};

export default Boton;
