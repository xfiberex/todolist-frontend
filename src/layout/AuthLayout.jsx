// src/layout/AuthLayout.jsx

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {/* El grid ahora alinea los items al centro y asegura un gap consistente */}
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <Outlet />
            </div>
        </main>
    );
};

export default AuthLayout;