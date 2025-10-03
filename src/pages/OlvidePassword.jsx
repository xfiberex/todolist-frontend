"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import clienteAxios from "../../config/axios"
import AuthBranding from "../components/AuthBranding"
import AuthFormCard from "../components/AuthFormCard"
import { AlertaEstatica } from "../components/Alerta"
import Boton from "../components/Boton"
import Spinner from "../components/Spinner"

const OlvidePassword = () => {
  const [alertaEstatica, setAlertaEstatica] = useState({})
  const [enviado, setEnviado] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setAlertaEstatica({})
    try {
      const { data: responseData } = await clienteAxios.post("/usuarios/olvide-password", data)
      setAlertaEstatica({ msg: responseData.msg, error: false })
      setEnviado(true)
      reset()
    } catch (error) {
      setAlertaEstatica({ msg: error.response?.data?.msg || "Error en el servidor", error: true })
    }
  }

  return (
    <>
      <AuthBranding
        title={
          <>
            ¿Olvidaste tu Contraseña?{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Recupérala</span>
          </>
        }
        subtitle="Ingresa tu correo electrónico y te enviaremos las instrucciones para reestablecer tu contraseña."
      />

      <AuthFormCard title="Recuperar Acceso">
        <AlertaEstatica alerta={alertaEstatica} />

        {!enviado ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="text-slate-600 font-bold block mb-2">Correo Electrónico</label>
              <input
                type="email"
                placeholder="tu.correo@email.com"
                className={`border w-full p-3.5 mt-2 bg-slate-50 rounded-xl transition-all duration-300 focus:outline-none focus:scale-[1.01] focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300"}`}
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Formato de correo no válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                  <span>⚠</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <Boton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                  <span>Enviando...</span>
                </div>
              ) : (
                "Enviar Instrucciones"
              )}
            </Boton>
          </form>
        ) : (
          <div className="text-center p-6 bg-teal-50 border border-teal-200 rounded-xl">
            <div className="text-teal-600 text-5xl mb-4">✓</div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Hemos enviado las instrucciones a tu correo. Por favor, revisa tu bandeja de entrada (y la carpeta de
              spam).
            </p>
            <Link
              to="/"
              className="inline-block text-teal-600 font-bold hover:text-teal-700 hover:underline transition-colors"
            >
              Volver a Iniciar Sesión
            </Link>
          </div>
        )}

        <nav className="mt-8 text-center text-sm">
          <Link className="block text-slate-500 hover:text-teal-600 transition-colors" to="/">
            ¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span>
          </Link>
        </nav>
      </AuthFormCard>
    </>
  )
}

export default OlvidePassword
