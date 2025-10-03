"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import ProfileLayout from "../layout/ProfileLayout"
import Alerta from "../components/Alerta"
import Boton from "../components/Boton"
import Spinner from "../components/Spinner"

const ActualizarPerfil = () => {
  const { auth, actualizarPerfil, cerrarSesionAuth } = useAuth()
  const [alerta, setAlerta] = useState({})
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const emailActual = watch("email")

  useEffect(() => {
    if (auth.nombre) {
      reset({ nombre: auth.nombre, apellido: auth.apellido, email: auth.email })
    }
  }, [auth, reset])

  const onSubmit = async (data) => {
    setAlerta({})
    try {
      const emailCambiado = auth.email !== data.email
      const resultado = await actualizarPerfil({ ...data, _id: auth._id })
      setAlerta(resultado)

      if (!resultado.error && emailCambiado) {
        setIsLoggingOut(true)
        setTimeout(() => {
          sessionStorage.setItem("mensajePostLogout", "Revisa tu nueva bandeja de entrada para confirmar tu cuenta.")
          cerrarSesionAuth()
        }, 4000)
      }
    } catch {
      setAlerta({ msg: "Ocurrió un error al actualizar el perfil", error: true })
    }
  }

  return (
    <ProfileLayout>
      <div className="mb-8">
        <h2 className="font-black text-4xl bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
          Editar Perfil
        </h2>
        <p className="text-lg mt-3 text-slate-400 leading-relaxed">
          Modifica tu información personal. Los cambios en tu nombre se reflejarán en toda la aplicación.
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 shadow-xl shadow-slate-900/20 rounded-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {alerta.msg && <Alerta alerta={alerta} />}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="font-bold text-sm text-slate-300 block mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre..."
                className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.nombre ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />
              {errors.nombre && (
                <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="font-bold text-sm text-slate-300 block mb-2">Apellido</label>
              <input
                type="text"
                placeholder="Ingresa tu apellido..."
                className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.apellido ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
                {...register("apellido", { required: "El apellido es obligatorio" })}
              />
              {errors.apellido && (
                <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.apellido.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="font-bold text-sm text-slate-300 block mb-2">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo electronico..."
              className={`w-full p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:scale-[1.02] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/50"}`}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Formato no válido" },
              })}
            />
            {errors.email && (
              <p className="text-red-400 mt-2 text-sm flex items-center gap-1">
                <span>⚠</span>
                {errors.email.message}
              </p>
            )}

            {auth.email !== emailActual && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
                <p className="text-yellow-400/90 text-sm flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <span>
                    <strong>Atención:</strong> Si cambias tu correo, tu sesión se cerrará y deberás volver a confirmar
                    tu cuenta desde la nueva dirección.
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="text-right">
            <Boton type="submit" disabled={isSubmitting || isLoggingOut}>
              {isLoggingOut ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Cerrando...</span>
                </div>
              ) : isSubmitting ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Guardando...</span>
                </div>
              ) : (
                "Guardar Cambios"
              )}
            </Boton>
          </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default ActualizarPerfil
