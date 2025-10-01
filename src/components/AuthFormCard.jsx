// src/components/AuthFormCard.jsx

// Este componente crea la tarjeta blanca estandarizada para todos los formularios de autenticación.
const AuthFormCard = ({ title, children }) => {
    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg border-t-4 border-teal-500 p-8">
            {/* Título del Formulario (ej. "Iniciar Sesión") */}
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
                {title}
            </h2>
            
            {/* El contenido del formulario (pasado como children) */}
            {children}
        </div>
    );
};

export default AuthFormCard;