// src/components/AuthBranding.jsx

const AuthBranding = ({ title, subtitle }) => {
  return (
    <div className="hidden md:flex flex-col justify-center items-center text-center p-8">
      <div className="max-w-md">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full animate-pulse" />
          <img
            src="/favicon.svg"
            alt="Logo ToDoList App"
            className="relative h-16 w-16 mx-auto drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]"
          />
        </div>

        <h1 className="text-slate-200 font-black text-4xl lg:text-5xl leading-tight mb-2 drop-shadow-lg">{title}</h1>

        <p className="text-slate-400 mt-4 text-lg leading-relaxed">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthBranding
