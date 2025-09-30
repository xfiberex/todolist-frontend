// src/pages/ActualizarPerfil.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const ActualizarPerfil = () => {
    // Hooks
    const { auth, actualizarPerfil, cerrarSesionAuth } = useAuth();

    // Estado de la UI
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset, // reset es clave para poblar el formulario
        formState: { errors, isSubmitting },
    } = useForm();

    // Observar el email actual para mostrar el aviso condicionalmente
    const emailActual = watch("email");

    // Efecto para poblar el formulario cuando los datos de 'auth' estén disponibles
    useEffect(() => {
        if (auth.nombre) {
            reset({
                nombre: auth.nombre,
                apellido: auth.apellido,
                email: auth.email,
            });
        }
    }, [auth, reset]);

    const onSubmit = async (data) => {
        setAlertaEstatica({});

        try {
            const emailCambiado = auth.email !== data.email;

            const resultado = await actualizarPerfil(data);

            setAlertaEstatica(resultado);

            if (!resultado.error && emailCambiado) {
                setIsLoggingOut(true);
                setTimeout(() => {
                    sessionStorage.setItem(
                        "mensajePostLogout",
                        "Revisa tu nueva bandeja de entrada para confirmar tu cuenta."
                    );
                    cerrarSesionAuth();
                }, 4000);
            }
        } catch {
            setAlertaEstatica({
                msg: "Ocurrió un error al actualizar el perfil",
                error: true,
            });
        }
    };

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-4xl text-slate-100 text-center mt-10">
                Editar Perfil
            </h2>
            <p className="text-xl mt-5 mb-10 text-center text-slate-300">
                Modifica tu {""}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold">
                    información aquí
                </span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                    <AlertaEstatica alerta={alertaEstatica} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.nombre
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                {...register("nombre", {
                                    required: "El nombre es obligatorio",
                                })}
                            />
                            {errors.nombre && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.nombre.message}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Apellido
                            </label>
                            <input
                                type="text"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.apellido
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                {...register("apellido", {
                                    required: "El apellido es obligatorio",
                                })}
                            />
                            {errors.apellido && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.apellido.message}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Correo
                            </label>
                            <input
                                type="email"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Formato de correo no válido",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.email.message}
                                </p>
                            )}

                            {auth.email !== emailActual && (
                                <p className="text-yellow-400 p-5 border border-slate-700 shadow rounded-lg mt-5">
                                    <strong>Atención:</strong> Si cambias tu
                                    correo, tu sesión se cerrará y deberás
                                    volver a confirmar tu cuenta.
                                </p>
                            )}
                        </div>

                        <Boton
                            type="submit"
                            disabled={isSubmitting || isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Cerrando Sesión...</span>
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
                    </form>
                </div>
            </div>
        </>
    );
};

export default ActualizarPerfil;
