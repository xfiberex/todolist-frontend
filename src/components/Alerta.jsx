"use client"

import { useState, useEffect } from "react"

// --- Iconos de Ayuda ---
const IconoError = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const IconoExito = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

// --- VERSIÓN 1: Alerta Estática ---
export const AlertaEstatica = ({ alerta }) => {
  if (!alerta || !alerta.msg) {
    return null
  }

  return (
    <div
      className={`${
        alerta.error ? "from-red-500 to-red-600 shadow-red-500/30" : "from-teal-500 to-emerald-600 shadow-teal-500/30"
      } bg-gradient-to-br shadow-xl rounded-lg p-4 mb-10 flex items-center space-x-4 animate-fadeIn backdrop-blur-sm border ${
        alerta.error ? "border-red-400/30" : "border-teal-400/30"
      }`}
      role="alert"
      aria-live={alerta.error ? "assertive" : "polite"}
    >
      <div className="flex-shrink-0">{alerta.error ? <IconoError /> : <IconoExito />}</div>
      <div className="flex-1">
        <p className="text-white font-bold">{alerta.msg}</p>
      </div>
    </div>
  )
}

// --- VERSIÓN 2: Alerta Dinámica ---
const Alerta = ({ alerta }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alerta && alerta.msg) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [alerta])

  if (!visible) return null

  return (
    <div
      className={`${
        alerta.error ? "from-red-500 to-red-600 shadow-red-500/30" : "from-teal-500 to-emerald-600 shadow-teal-500/30"
      } bg-gradient-to-br shadow-xl rounded-lg p-4 mb-10 flex items-center space-x-4 backdrop-blur-sm border ${
        alerta.error ? "border-red-400/30" : "border-teal-400/30"
      } animate-fadeIn`}
      role="alert"
      aria-live={alerta.error ? "assertive" : "polite"}
    >
      <div className="flex-shrink-0">{alerta.error ? <IconoError /> : <IconoExito />}</div>
      <div className="flex-1">
        <p className="text-white font-bold">{alerta.msg}</p>
      </div>
    </div>
  )
}

export default Alerta
