import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.08),transparent_50%)] animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.06),transparent_50%)] animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      ></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Content container */}
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
