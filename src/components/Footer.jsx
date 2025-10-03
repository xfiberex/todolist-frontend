// src/components/Footer.jsx

const Footer = () => {
  return (
    <footer className="relative py-8 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 mt-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <p className="text-center font-bold text-slate-400">
          ToDoList - Gestor de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]">
            Tareas
          </span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
