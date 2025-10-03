"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../../config/axios"
import AuthBranding from "../components/AuthBranding"
import Alerta from "../components/Alerta"

const IconoExito = () => (
  <svg className="h-20 w-20 text-teal-500 mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const IconoError = () => (
  <svg className="h-20 w-20 text-red-500 mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ConfirmarCuenta = () => {
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const { token } = useParams()

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${token}`
        const { data } = await clienteAxios(url)
        setAlerta({ msg: data.msg, error: false })
      } catch (error) {
        setAlerta({ msg: error.response?.data?.msg || "Error al confirmar la cuenta", error: true })
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [token])

  return (
    <>
      <AuthBranding
        title={
          <>
            ¡Casi Listo! Confirma tu{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Cuenta</span>
          </>
        }
        subtitle="Este último paso asegura que tu cuenta es segura y está lista para ser usada."
      />

      <div className="w-full max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border-t-4 border-teal-500 p-10 text-center">
          {cargando ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-teal-500"></div>
              <p className="text-slate-600 font-medium">Verificando tu cuenta...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">{alerta.error ? <IconoError /> : <IconoExito />}</div>
              <Alerta alerta={alerta} />

              {!alerta.error && (
                <Link
                  className="inline-block mt-8 py-3.5 px-12 text-white font-bold rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40"
                  to="/"
                >
                  Iniciar Sesión
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ConfirmarCuenta
