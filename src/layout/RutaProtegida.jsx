"use client"

import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"

const RutaProtegida = () => {
  const { auth, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_50%)]"></div>

        {/* Modern spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-700/50 border-t-teal-500 rounded-full animate-spin shadow-lg shadow-teal-500/20"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400/30 rounded-full animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {auth?._id ? (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.03),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto mt-10 px-4 flex-grow">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default RutaProtegida
