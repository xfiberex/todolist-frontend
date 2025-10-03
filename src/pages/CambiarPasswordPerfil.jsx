"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import ProfileLayout from "../layout/ProfileLayout"
import Alerta from "../components/Alerta"
import Boton from "../components/Boton"
import Spinner from "../components/Spinner"

const CambiarPasswordPerfil = () => {
  const { actualizarPasswordPerfil, cerrarSesionAuth } = useAuth()
  const [alerta, setAlerta] = useState({})
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const pwd_nuevo_value = watch("pwd_nuevo")

  const onSubmit = async (data) => {
    setAlerta({})
    try {
      const respuesta = await actualizarPasswordPerfil(data)
      setAlerta(respuesta)
      if (!respuesta.error) {
        reset()
        setIsLoggingOut(true)
        setTimeout(() => {
          sessionStorage.setItem("mensajePostLogout", "Contraseña actualizada. Por favor, inicia sesión de nuevo.")
          cerrarSesionAuth()
        }, 3000)
      }
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg || "Ocurrió un error", error: true })
    }
  }

  return (
    <ProfileLayout>
      <div className="mb-8">
        <h2 className="font-black text-4xl bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
          Cambiar Contraseña
        </h2>
        <p className="text-lg mt-3 text-slate-400 leading-relaxed">
          Asegura tu cuenta actualizando tu contraseña regularmente.
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 shadow-xl shadow-slate-900/20 rounded-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {alerta.msg && <Alerta alerta={alerta} />}

          <div className="mb-6">
            <label className="font-bold text-sm text-slate-300 block mb-2">Contraseña Actual</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña actual..."
              className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.pwd_actual ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
              {...register("pwd_actual", { required: "La contraseña actual es obligatoria" })}
            />
            {errors.pwd_actual && (
              <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                <span>⚠</span>
                {errors.pwd_actual.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="font-bold text-sm text-slate-300 block mb-2">Contraseña Nueva</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña nueva..."
                className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.pwd_nuevo ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
                {...register("pwd_nuevo", {
                  required: "La contraseña nueva es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              {errors.pwd_nuevo && (
                <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.pwd_nuevo.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="font-bold text-sm text-slate-300 block mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Repite la nueva contraseña..."
                className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.repetir_pwd_nuevo ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
                {...register("repetir_pwd_nuevo", {
                  required: "Confirma la contraseña",
                  validate: (value) => value === pwd_nuevo_value || "Las contraseñas no coinciden",
                })}
              />
              {errors.repetir_pwd_nuevo && (
                <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.repetir_pwd_nuevo.message}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-400 mt-2 mb-6 p-4 bg-slate-900/50 border border-slate-700/30 rounded-xl">
            <span className="text-teal-400 font-semibold">ℹ️ Nota:</span> Por seguridad, tu sesión se cerrará después de
            cambiar la contraseña y deberás volver a iniciar sesión.
          </p>

          <div className="text-right">
            <Boton type="submit" disabled={isSubmitting || isLoggingOut}>
              {isLoggingOut ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Cerrando Sesión...</span>
                </div>
              ) : isSubmitting ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Actualizando...</span>
                </div>
              ) : (
                "Actualizar Contraseña"
              )}
            </Boton>
          </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default CambiarPasswordPerfil
