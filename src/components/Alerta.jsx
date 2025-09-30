import { useState, useEffect } from "react";

// --- Iconos de Ayuda (sin cambios) ---
const IconoError = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

const IconoExito = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

// --- VERSIÓN 1: Alerta Estática (Nueva, sin setTimeout) ---
// Esta alerta será visible siempre que reciba un mensaje en sus props.
// Su visibilidad es 100% controlada por el componente padre.
export const AlertaEstatica = ({ alerta }) => {
    // Si no hay alerta o mensaje, simplemente no renderiza nada.
    if (!alerta || !alerta.msg) {
        return null;
    }

    return (
        <div
            className={`${
                alerta.error
                    ? "from-red-400 to-red-600"
                    : // NUEVO: El color de éxito ahora es 'teal'
                      "from-teal-400 to-teal-600"
            } bg-gradient-to-br shadow-lg rounded-md p-4 mb-10 flex items-center space-x-4 animate-fadeIn`}
        >
            <div className="flex-shrink-0">
                {alerta.error ? <IconoError /> : <IconoExito />}
            </div>
            <div className="flex-1">
                <p className="text-white font-bold">{alerta.msg}</p>
            </div>
        </div>
    );
};

// --- VERSIÓN 2: Alerta Dinámica (La original, con setTimeout) ---
// Esta es la versión original que se oculta automáticamente después de 3 segundos.
const Alerta = ({ alerta }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (alerta && alerta.msg) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            // Limpieza del temporizador
            return () => clearTimeout(timer);
        } else {
            // Si llega una alerta vacía, nos aseguramos de que esté oculta.
            setVisible(false);
        }
    }, [alerta]);

    if (!visible) return null;

    return (
        <div
            className={`${
                alerta.error
                    ? "from-red-400 to-red-600"
                    : // NUEVO: El color de éxito también cambia aquí a 'teal'
                      "from-teal-400 to-teal-600"
            } bg-gradient-to-br shadow-lg rounded-md p-4 mb-10 flex items-center space-x-4`}
        >
            <div className="flex-shrink-0">
                {alerta.error ? <IconoError /> : <IconoExito />}
            </div>
            <div className="flex-1">
                <p className="text-white font-bold">{alerta.msg}</p>
            </div>
        </div>
    );
};

export default Alerta;
