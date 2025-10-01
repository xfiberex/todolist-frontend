// src/layout/ProfileLayout.jsx

import AdminNav from '../components/AdminNav';

const ProfileLayout = ({ children }) => {
    return (
        <div className="md:grid md:grid-cols-12 md:gap-10">
            {/* Columna de Navegación */}
            <aside className="md:col-span-4 lg:col-span-3">
                <AdminNav />
            </aside>

            {/* Columna de Contenido Principal */}
            <main className="md:col-span-8 lg:col-span-9 mt-10 md:mt-0">
                {children}
            </main>
        </div>
    );
};

export default ProfileLayout;