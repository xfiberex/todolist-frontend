// src/components/FormularioTareas.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useTareas from "../hooks/useTareas";
import Alerta from "./Alerta";
import Boton, { BotonCancelacion } from "./Boton";
import Spinner from "./Spinner";

const FormularioTareas = () => {
    const { guardarTarea, tarea, cancelarEdicionTarea } = useTareas();
    const [alerta, setAlerta] = useState({});

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Poblar formulario para edición
    useEffect(() => {
        if (tarea?.nombre) {
            reset({
                id: tarea._id,
                nombre: tarea.nombre,
                descripcion: tarea.descripcion,
                fechaEntrega: new Date(tarea.fechaEntrega).toISOString().split("T")[0],
                prioridad: tarea.prioridad,
            });
        } else {
            reset({
                id: null,
                nombre: "",
                descripcion: "",
                fechaEntrega: new Date().toISOString().split("T")[0],
                prioridad: "",
            });
        }
    }, [tarea, reset]);

    const onSubmit = async data => {
        setAlerta({});
        try {
            const dateParts = data.fechaEntrega.split("-").map(part => parseInt(part, 10));
            const fechaUTC = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
            const resultado = await guardarTarea({ ...data, fechaEntrega: fechaUTC });

            setAlerta(resultado);
            // El `cancelarEdicionTarea` ya limpia el form y cierra el modal
            if (!resultado.error) {
                cancelarEdicionTarea();
            }
        } catch {
            setAlerta({ msg: "Hubo un error al guardar la tarea", error: true });
        }
    };

    return (
        // Se elimina el <aside> y los títulos que estaban antes
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {alerta.msg && <Alerta alerta={alerta} />}

            {/* Campos del formulario (sin cambios en la estructura interna) */}
            <div>
                <label htmlFor="nombre" className="block text-slate-300 font-semibold mb-2">
                    Nombre Tarea
                </label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Ej. Terminar reporte mensual"
                    className={`block w-full rounded-md p-3 bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                        errors.nombre ? "border-red-500" : "border-slate-700"
                    }`}
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && (
                    <p className="text-red-600 mt-1 text-sm">{errors.nombre.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="descripcion" className="block text-slate-300 font-semibold mb-2">
                    Descripción
                </label>
                <textarea
                    id="descripcion"
                    placeholder="Detalles de la tarea..."
                    className={`block w-full rounded-md p-3 h-32 resize-none bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                        errors.descripcion ? "border-red-500" : "border-slate-700"
                    }`}
                    {...register("descripcion", { required: "La descripción es obligatoria" })}
                />
                {errors.descripcion && (
                    <p className="text-red-600 mt-1 text-sm">{errors.descripcion.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="fechaEntrega" className="block text-slate-300 font-semibold mb-2">
                    Fecha de Entrega
                </label>
                <input
                    id="fechaEntrega"
                    type="date"
                    className={`block w-full rounded-md p-3 bg-slate-900 border text-white ${
                        errors.fechaEntrega ? "border-red-500" : "border-slate-700"
                    }`}
                    {...register("fechaEntrega", { required: "La fecha es obligatoria" })}
                />
                {errors.fechaEntrega && (
                    <p className="text-red-600 mt-1 text-sm">{errors.fechaEntrega.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="prioridad" className="block text-slate-300 font-semibold mb-2">
                    Prioridad
                </label>
                <select
                    id="prioridad"
                    className={`block w-full rounded-md p-3 bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer pr-10 ${
                        errors.prioridad ? "border-red-500" : "border-slate-700"
                    }`}
                    {...register("prioridad", { required: "Debes seleccionar una prioridad" })}
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
                {errors.prioridad && (
                    <p className="text-red-600 mt-1 text-sm">{errors.prioridad.message}</p>
                )}
            </div>

            {/* Botones al final del formulario */}
            <div className="flex flex-col sm:flex-row-reverse gap-4 pt-4 border-t border-slate-700/50">
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
    );
};

export default FormularioTareas;
