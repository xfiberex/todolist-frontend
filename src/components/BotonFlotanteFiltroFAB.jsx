// src/components/BotonFlotanteFiltroFAB.jsx

const BotonFlotanteFiltroFAB = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="md:hidden fixed bottom-24 right-6 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-4 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-slate-400/60"
            aria-label="Abrir filtros"
        >
            {/* icono filtro / embudo */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.6 4.8a1 1 0 00-.2.6V15l-4 2v-6c0-.2-.07-.4-.2-.6L3.2 4.6A1 1 0 013 4z" clipRule="evenodd" />
            </svg>
        </button>
    );
};

export default BotonFlotanteFiltroFAB;
