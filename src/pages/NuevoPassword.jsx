"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import clienteAxios from "../../config/axios"
import AuthBranding from "../components/AuthBranding"
import AuthFormCard from "../components/AuthFormCard"
import Alerta from "../components/Alerta"
import Boton from "../components/Boton"
import Spinner from "../components/Spinner"

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [alerta, setAlerta] = useState({})

  const { token } = useParams()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const passwordValue = watch("password")

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch {
        setAlerta({ msg: "El enlace no es válido o ha expirado. Por favor, solicita un nuevo correo.", error: true })
      }
    }
    comprobarToken()
  }, [token])

  const onSubmit = async (data) => {
    setAlerta({})
    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data: responseData } = await clienteAxios.post(url, { password: data.password })

      setAlerta({ msg: responseData.msg, error: false })
      setPasswordModificado(true)
      reset()
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg || "Error en el servidor", error: true })
    }
  }

  return (
    <>
      <AuthBranding
        title={
          <>
            Define tu Nueva Contraseña{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">y Continúa</span>
          </>
        }
        subtitle="Elige una contraseña segura y fácil de recordar para proteger tu cuenta."
      />

      <AuthFormCard title="Crear Nueva Contraseña">
        <Alerta alerta={alerta} />

        {tokenValido && !passwordModificado && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="text-slate-600 font-bold block mb-2">Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className={`border w-full p-3.5 mt-2 bg-slate-50 rounded-xl transition-all duration-300 focus:outline-none focus:scale-[1.01] focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300"}`}
                {...register("password", {
                  required: "La nueva contraseña es obligatoria",
                  minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                })}
              />
              {errors.password && (
                <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label className="text-slate-600 font-bold block mb-2">Repetir Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className={`border w-full p-3.5 mt-2 bg-slate-50 rounded-xl transition-all duration-300 focus:outline-none focus:scale-[1.01] focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.repetirPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300"}`}
                {...register("repetirPassword", {
                  required: "Debes confirmar la contraseña",
                  validate: (value) => value === passwordValue || "Las contraseñas no coinciden",
                })}
              />
              {errors.repetirPassword && (
                <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.repetirPassword.message}
                </p>
              )}
            </div>

            <Boton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Guardando...</span>
                </div>
              ) : (
                "Guardar Nueva Contraseña"
              )}
            </Boton>
          </form>
        )}

        {passwordModificado && (
          <div className="text-center p-6 bg-teal-50 border border-teal-200 rounded-xl">
            <div className="text-teal-600 text-5xl mb-4">✓</div>
            <p className="text-slate-600 mb-6">Tu contraseña ha sido actualizada exitosamente.</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20"
            >
              Ir a Iniciar Sesión
            </Link>
          </div>
        )}
      </AuthFormCard>
    </>
  )
}

export default NuevoPassword
