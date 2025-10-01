// src/components/FAB.jsx

const BotonFlotanteFAB = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="md:hidden fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-teal-400"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        </button>
    );
};

export default BotonFlotanteFAB;