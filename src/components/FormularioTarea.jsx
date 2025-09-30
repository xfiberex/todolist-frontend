// src/components/FormularioTareas.jsx

import { useState, useEffect } from "react";
import Alerta, { AlertaEstatica } from "./Alerta";
import Boton, { BotonCancelacion } from "./Boton";
import Spinner from "./Spinner";
import useTareas from "../hooks/useTareas";

const FormularioTareas = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [prioridad, setPrioridad] = useState("");
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [cargando, setCargando] = useState(false);

    const { guardarTarea, tarea, cancelarEdicionTarea } = useTareas();

    useEffect(() => {
        if (tarea?.nombre) {
            setNombre(tarea.nombre);
            setDescripcion(tarea.descripcion);
            setFechaEntrega(
                new Date(tarea.fechaEntrega).toISOString().split("T")[0]
            );
            setPrioridad(tarea.prioridad);
            setId(tarea._id);
        }
    }, [tarea]);

    const formularioSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, prioridad].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }

        setAlerta({});
        setAlertaEstatica({});
        setCargando(true);

        try {
            // CORRECCIÓN DE FECHA: creación en UTC
            const dateParts = fechaEntrega
                .split("-")
                .map((part) => parseInt(part, 10));
            const fechaUTC = new Date(
                Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
            );

            const fakeDelay = new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );

            const tareaParaGuardar = {
                nombre,
                descripcion,
                fechaEntrega: fechaUTC,
                prioridad,
                id,
            };

            const [resultado] = await Promise.all([
                guardarTarea(tareaParaGuardar),
                fakeDelay,
            ]);

            setAlerta(resultado);

            if (!resultado.error) {
                limpiarFormulario();
            }
        } catch {
            setAlertaEstatica({
                msg: "Hubo un error al guardar la tarea",
                error: true,
            });
        } finally {
            setCargando(false);
        }
    };

    const formularioCancelarEdicion = () => {
        limpiarFormulario();
        cancelarEdicionTarea();
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setFechaEntrega(new Date().toISOString().split("T")[0]);
        setPrioridad("");
        setId(null);
    };

    return (
        <>
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

                <AlertaEstatica alerta={alertaEstatica} />

                <form
                    className="bg-slate-800 p-8 rounded-lg border border-slate-700 space-y-6"
                    onSubmit={formularioSubmit}
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
                            className="block w-full rounded-md p-3 bg-slate-900 border border-slate-700 text-white
                                   focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
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
                            className="block w-full rounded-md p-3 h-32 resize-none bg-slate-900 border border-slate-700 text-white
                                   focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
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
                            className="block w-full rounded-md p-3 bg-slate-900 border border-slate-700 text-white"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                        />
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
                            className="block w-full rounded-md p-3 bg-slate-900 border border-slate-700 text-white
                                   focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                        >
                            <option value="">
                                -- Seleccionar Prioridad --
                            </option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Boton type="submit" disabled={cargando}>
                            {cargando ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Guardando...</span>
                                </div>
                            ) : id ? (
                                "Guardar Cambios"
                            ) : (
                                "Añadir Tarea"
                            )}
                        </Boton>

                        {id && (
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
        </>
    );
};

export default FormularioTareas;
