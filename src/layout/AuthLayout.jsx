import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            {/* 
              NUEVO: Se reemplaza el layout de 'container' por uno que ocupa
              toda la pantalla (min-h-screen) con un fondo oscuro (bg-slate-900)
              y centra todo el contenido vertical y horizontalmente.
            */}
            <main className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
                {/* 
                  El contenedor del grid original ahora vive dentro de este layout 
                  para mantener la estructura de dos columnas en escritorio.
                */}
                <div className="container mx-auto md:grid md:grid-cols-2 gap-12 items-center">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;
