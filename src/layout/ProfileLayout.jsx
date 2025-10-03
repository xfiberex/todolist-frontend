import AdminNav from "../components/AdminNav"

const ProfileLayout = ({ children }) => {
  return (
    <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-10">
      {/* Columna de Navegación con borde sutil */}
      <aside className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0">
        <div className="md:sticky md:top-10">
          <AdminNav />
        </div>
      </aside>

      {/* Columna de Contenido Principal con separador visual sutil */}
      <main className="md:col-span-8 lg:col-span-9 md:pl-8 lg:pl-10 md:border-l md:border-slate-700/30">
        {children}
      </main>
    </div>
  )
}

export default ProfileLayout
