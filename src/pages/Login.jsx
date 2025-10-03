"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import clienteAxios from "../../config/axios"
import useAuth from "../hooks/useAuth"
import AuthBranding from "../components/AuthBranding"
import AuthFormCard from "../components/AuthFormCard"
import Alerta from "../components/Alerta"
import Boton from "../components/Boton"
import Spinner from "../components/Spinner"

const Login = () => {
  const [alerta, setAlerta] = useState({})
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    const mensaje = sessionStorage.getItem("mensajePostLogout")
    if (mensaje) {
      setAlerta({ msg: mensaje, error: false })
      sessionStorage.removeItem("mensajePostLogout")
    }
  }, [])

  const onSubmit = async (data) => {
    setAlerta({})
    try {
      const { data: responseData } = await clienteAxios.post("/usuarios/login", data)
      localStorage.setItem("token", responseData.token)
      setAuth(responseData)
      navigate("/admin")
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg || "Error en el servidor", error: true })
    }
  }

  return (
    <>
      <AuthBranding
        title={
          <>
            Organiza tu mundo,{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              una tarea a la vez
            </span>
          </>
        }
        subtitle="Inicia sesión para acceder a tus proyectos y administrar tu productividad."
      />

      <AuthFormCard title="Iniciar Sesión">
        {alerta.msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="text-slate-600 font-bold block mb-2">Correo Electrónico</label>
            <input
              type="email"
              placeholder="tu.correo@email.com"
              className={`border w-full p-3.5 mt-2 bg-slate-50 rounded-xl transition-all duration-300 focus:outline-none focus:scale-[1.01] focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300"}`}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Formato de correo no válido" },
              })}
            />
            {errors.email && (
              <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                <span>⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="text-slate-600 font-bold block mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className={`border w-full p-3.5 mt-2 bg-slate-50 rounded-xl transition-all duration-300 focus:outline-none focus:scale-[1.01] focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-lg focus:shadow-teal-500/10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300"}`}
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                <span>⚠</span>
                {errors.password.message}
              </p>
            )}
          </div>

          <Boton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex justify-center items-center gap-3">
                <Spinner />
                <span>Iniciando...</span>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Boton>
        </form>

        <nav className="mt-8 text-center text-sm space-y-2">
          <Link className="block text-slate-500 hover:text-teal-600 transition-colors" to="/registrar">
            ¿No tienes una cuenta? <span className="font-bold">Regístrate</span>
          </Link>
          <Link className="block text-slate-500 hover:text-teal-600 transition-colors" to="/olvide-password">
            Olvidé mi contraseña
          </Link>
        </nav>
      </AuthFormCard>
    </>
  )
}

export default Login
