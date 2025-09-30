// src/components/FormularioTareas.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useTareas from "../hooks/useTareas";
import Alerta from "./Alerta";
import Boton, { BotonCancelacion } from "./Boton";
import Spinner from "./Spinner";

const FormularioTareas = () => {
    // Hooks de estado y contexto
    const { guardarTarea, tarea, cancelarEdicionTarea } = useTareas();
    const [alerta, setAlerta] = useState({});

    // useForm hook
    const {
        register,
        handleSubmit,
        reset, // reset se usará para limpiar y poblar el formulario
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            id: null,
            nombre: "",
            descripcion: "",
            fechaEntrega: new Date().toISOString().split("T")[0],
            prioridad: "",
        },
    });

    // Efecto para poblar el formulario cuando se selecciona una tarea para editar
    useEffect(() => {
        if (tarea?.nombre) {
            reset({
                id: tarea._id,
                nombre: tarea.nombre,
                descripcion: tarea.descripcion,
                fechaEntrega: new Date(tarea.fechaEntrega)
                    .toISOString()
                    .split("T")[0],
                prioridad: tarea.prioridad,
            });
        }
    }, [tarea, reset]);

    // Función de envío
    const onSubmit = async (data) => {
        setAlerta({});
        try {
            // Conversión de fecha a objeto Date en UTC
            const dateParts = data.fechaEntrega
                .split("-")
                .map((part) => parseInt(part, 10));
            const fechaUTC = new Date(
                Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
            );

            const resultado = await guardarTarea({
                ...data,
                fechaEntrega: fechaUTC,
            });

            setAlerta(resultado);
            if (!resultado.error) {
                formularioCancelarEdicion(); // Usa la función para limpiar y resetear
            }
        } catch {
            setAlerta({
                msg: "Hubo un error al guardar la tarea",
                error: true,
            });
        }
    };

    // Función para cancelar y limpiar
    const formularioCancelarEdicion = () => {
        reset({
            // Resetea el formulario a su estado inicial
            id: null,
            nombre: "",
            descripcion: "",
            fechaEntrega: new Date().toISOString().split("T")[0],
            prioridad: "",
        });
        cancelarEdicionTarea(); // Llama a la función del context
    };

    return (
        <aside className="sticky top-4 h-fit">
            <h2 className="font-black text-4xl text-slate-100 text-center">
                Gestiona tus Tareas
            </h2>
            <p className="text-xl mt-5 mb-10 text-center text-slate-300">
                Añade tus tareas y{" "}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold">
                    Adminístralas
                </span>
            </p>

            <form
                className="bg-slate-800 p-8 rounded-lg border border-slate-700 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Alerta alerta={alerta} />
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-slate-300 font-semibold mb-2"
                    >
                        Nombre Tarea
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ej. Terminar reporte mensual"
                        className={`block w-full rounded-md p-3 bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                            errors.nombre
                                ? "border-red-500"
                                : "border-slate-700"
                        }`}
                        {...register("nombre", {
                            required: "El nombre de la tarea es obligatorio",
                        })}
                    />
                    {errors.nombre && (
                        <p className="text-red-600 mt-1 text-sm">
                            {errors.nombre.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="descripcion"
                        className="block text-slate-300 font-semibold mb-2"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        placeholder="Detalles de la tarea..."
                        className={`block w-full rounded-md p-3 h-32 resize-none bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                            errors.descripcion
                                ? "border-red-500"
                                : "border-slate-700"
                        }`}
                        {...register("descripcion", {
                            required: "La descripción es obligatoria",
                        })}
                    />
                    {errors.descripcion && (
                        <p className="text-red-600 mt-1 text-sm">
                            {errors.descripcion.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="fechaEntrega"
                        className="block text-slate-300 font-semibold mb-2"
                    >
                        Fecha de Entrega
                    </label>
                    <input
                        id="fechaEntrega"
                        type="date"
                        className={`block w-full rounded-md p-3 bg-slate-900 border text-white ${
                            errors.fechaEntrega
                                ? "border-red-500"
                                : "border-slate-700"
                        }`}
                        {...register("fechaEntrega", {
                            required: "La fecha de entrega es obligatoria",
                        })}
                    />
                    {errors.fechaEntrega && (
                        <p className="text-red-600 mt-1 text-sm">
                            {errors.fechaEntrega.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="prioridad"
                        className="block text-slate-300 font-semibold mb-2"
                    >
                        Prioridad
                    </label>
                    <select
                        id="prioridad"
                        className={`block w-full rounded-md p-3 bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                            errors.prioridad
                                ? "border-red-500"
                                : "border-slate-700"
                        }`}
                        {...register("prioridad", {
                            required: "Debes seleccionar una prioridad",
                        })}
                    >
                        <option value="">-- Seleccionar Prioridad --</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                    {errors.prioridad && (
                        <p className="text-red-600 mt-1 text-sm">
                            {errors.prioridad.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Boton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <div className="flex justify-center items-center gap-3">
                                <Spinner />
                                <span>Guardando...</span>
                            </div>
                        ) : tarea?.nombre ? (
                            "Guardar Cambios"
                        ) : (
                            "Añadir Tarea"
                        )}
                    </Boton>
                    {tarea?.nombre && (
                        <BotonCancelacion
                            type="button"
                            onClick={formularioCancelarEdicion}
                        >
                            Cancelar Edición
                        </BotonCancelacion>
                    )}
                </div>
            </form>
        </aside>
    );
};

export default FormularioTareas;
