"use client"

// src/components/FormularioTareas.jsx

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useTareas from "../hooks/useTareas"
import Alerta from "./Alerta"
import Boton, { BotonCancelacion } from "./Boton"
import Spinner from "./Spinner"

const FormularioTareas = () => {
  const { guardarTarea, tarea, cancelarEdicionTarea } = useTareas()
  const [alerta, setAlerta] = useState({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  // Poblar formulario para edición
  useEffect(() => {
    if (tarea?.nombre) {
      reset({
        id: tarea._id,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fechaEntrega: new Date(tarea.fechaEntrega).toISOString().split("T")[0],
        prioridad: tarea.prioridad,
      })
    } else {
      reset({
        id: null,
        nombre: "",
        descripcion: "",
        fechaEntrega: new Date().toISOString().split("T")[0],
        prioridad: "",
      })
    }
  }, [tarea, reset])

  const onSubmit = async (data) => {
    setAlerta({})
    try {
      const dateParts = data.fechaEntrega.split("-").map((part) => Number.parseInt(part, 10))
      const fechaUTC = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]))
      const resultado = await guardarTarea({ ...data, fechaEntrega: fechaUTC })

      setAlerta(resultado)
      // El `cancelarEdicionTarea` ya limpia el form y cierra el modal
      if (!resultado.error) {
        cancelarEdicionTarea()
      }
    } catch {
      setAlerta({ msg: "Hubo un error al guardar la tarea", error: true })
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {alerta.msg && <Alerta alerta={alerta} />}

      {/* Campo Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-slate-200 font-bold mb-2 text-sm">
          Nombre Tarea
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej. Terminar reporte mensual"
          className={`block w-full rounded-xl p-3.5 
                              bg-slate-900/50 backdrop-blur-sm border text-white 
                              focus:outline-none focus:ring-2 transition-all duration-300
                              placeholder:text-slate-500
                              ${
                                errors.nombre
                                  ? "border-rose-500 focus:border-rose-400 focus:ring-rose-500/30"
                                  : "border-slate-700/50 focus:border-teal-500 focus:ring-teal-500/30 hover:border-slate-600"
                              }`}
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && (
          <p className="text-rose-400 mt-2 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.nombre.message}
          </p>
        )}
      </div>

      {/* Campo Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-slate-200 font-bold mb-2 text-sm">
          Descripción
        </label>
        <textarea
          id="descripcion"
          placeholder="Detalles de la tarea..."
          className={`block w-full rounded-xl p-3.5 h-32 resize-none 
                              bg-slate-900/50 backdrop-blur-sm border text-white 
                              focus:outline-none focus:ring-2 transition-all duration-300
                              placeholder:text-slate-500
                              ${
                                errors.descripcion
                                  ? "border-rose-500 focus:border-rose-400 focus:ring-rose-500/30"
                                  : "border-slate-700/50 focus:border-teal-500 focus:ring-teal-500/30 hover:border-slate-600"
                              }`}
          {...register("descripcion", { required: "La descripción es obligatoria" })}
        />
        {errors.descripcion && (
          <p className="text-rose-400 mt-2 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.descripcion.message}
          </p>
        )}
      </div>

      {/* Campo Fecha */}
      <div>
        <label htmlFor="fechaEntrega" className="block text-slate-200 font-bold mb-2 text-sm">
          Fecha de Entrega
        </label>
        <input
          id="fechaEntrega"
          type="date"
          className={`block w-full rounded-xl p-3.5 
                              bg-slate-900/50 backdrop-blur-sm border text-white 
                              focus:outline-none focus:ring-2 transition-all duration-300
                              [color-scheme:dark]
                              ${
                                errors.fechaEntrega
                                  ? "border-rose-500 focus:border-rose-400 focus:ring-rose-500/30"
                                  : "border-slate-700/50 focus:border-teal-500 focus:ring-teal-500/30 hover:border-slate-600"
                              }`}
          {...register("fechaEntrega", { required: "La fecha es obligatoria" })}
        />
        {errors.fechaEntrega && (
          <p className="text-rose-400 mt-2 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.fechaEntrega.message}
          </p>
        )}
      </div>

      {/* Campo Prioridad */}
      <div>
        <label htmlFor="prioridad" className="block text-slate-200 font-bold mb-2 text-sm">
          Prioridad
        </label>
        <select
          id="prioridad"
          className={`block w-full rounded-xl p-3.5 
                              bg-slate-900/50 backdrop-blur-sm border text-white 
                              focus:outline-none focus:ring-2 transition-all duration-300
                              appearance-none cursor-pointer pr-10
                              ${
                                errors.prioridad
                                  ? "border-rose-500 focus:border-rose-400 focus:ring-rose-500/30"
                                  : "border-slate-700/50 focus:border-teal-500 focus:ring-teal-500/30 hover:border-slate-600"
                              }`}
          {...register("prioridad", { required: "Debes seleccionar una prioridad" })}
        >
          <option value="">-- Seleccionar --</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        {errors.prioridad && (
          <p className="text-rose-400 mt-2 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.prioridad.message}
          </p>
        )}
      </div>

      {/* Botones al final del formulario */}
      <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-slate-700/50">
        <Boton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex justify-center items-center gap-3">
              <Spinner />
              <span>Guardando...</span>
            </div>
          ) : tarea?._id ? (
            "Guardar Cambios"
          ) : (
            "Añadir Tarea"
          )}
        </Boton>
        <BotonCancelacion type="button" onClick={cancelarEdicionTarea}>
          Cancelar
        </BotonCancelacion>
      </div>
    </form>
  )
}

export default FormularioTareas
