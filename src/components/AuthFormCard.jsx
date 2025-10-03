// src/components/AuthFormCard.jsx

const AuthFormCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-t-4 border-teal-500 p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/30 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-8 drop-shadow-sm">{title}</h2>

        {children}
      </div>
    </div>
  )
}

export default AuthFormCard
