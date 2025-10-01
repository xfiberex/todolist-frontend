// src/components/AuthBranding.jsx

// Este componente encapsula el panel de marca para las páginas de autenticación.
const AuthBranding = ({ title, subtitle }) => {
    return (
        <div className="hidden md:flex flex-col justify-center items-center text-center p-8">
            <div className="max-w-md">
                {/* Logo de la aplicación */}
                <img
                    src="/favicon.svg"
                    alt="Logo ToDoList App"
                    className="h-16 w-16 mx-auto mb-6"
                />
                
                {/* Título Principal */}
                <h1 className="text-slate-200 font-black text-4xl lg:text-5xl leading-tight">
                    {title}
                </h1>
                
                {/* Subtítulo descriptivo */}
                <p className="text-slate-400 mt-4 text-lg">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default AuthBranding;