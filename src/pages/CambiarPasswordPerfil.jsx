// src/pages/CambiarPasswordPerfil.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const CambiarPasswordPerfil = () => {
    // Hooks
    const { actualizarPasswordPerfil, cerrarSesionAuth } = useAuth();

    // Estado de la UI
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Observar la contraseña nueva para validación
    const pwd_nuevo_value = watch("pwd_nuevo");

    // Función de envío
    const onSubmit = async (data) => {
        setAlertaEstatica({});
        try {
            const respuesta = await actualizarPasswordPerfil(data);

            setAlertaEstatica(respuesta);

            if (!respuesta.error) {
                reset(); // Limpia el formulario
                setIsLoggingOut(true);

                setTimeout(() => {
                    sessionStorage.setItem(
                        "mensajePostLogout",
                        "Contraseña actualizada. Por favor, inicia sesión de nuevo."
                    );
                    cerrarSesionAuth();
                }, 3000);
            }
        } catch {
            setAlertaEstatica({
                msg: "Ocurrió un error inesperado",
                error: true,
            });
        }
    };

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-4xl text-slate-100 text-center mt-10">
                Cambio de Contraseña
            </h2>
            <p className="text-xl mt-5 mb-10 text-center text-slate-300">
                Modifica tu {""}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold">
                    contraseña aquí
                </span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                    <AlertaEstatica alerta={alertaEstatica} />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.pwd_actual
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                placeholder="Escribe tu contraseña actual..."
                                {...register("pwd_actual", {
                                    required:
                                        "La contraseña actual es obligatoria",
                                })}
                            />
                            {errors.pwd_actual && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.pwd_actual.message}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Contraseña Nueva
                            </label>
                            <input
                                type="password"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.pwd_nuevo
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                placeholder="Escribe tu contraseña nueva..."
                                {...register("pwd_nuevo", {
                                    required:
                                        "La contraseña nueva es obligatoria",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Debe tener al menos 6 caracteres",
                                    },
                                })}
                            />
                            {errors.pwd_nuevo && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.pwd_nuevo.message}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Repetir Contraseña Nueva
                            </label>
                            <input
                                type="password"
                                className={`w-full p-3 mt-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.repetir_pwd_nuevo
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }`}
                                placeholder="Repite tu contraseña nueva..."
                                {...register("repetir_pwd_nuevo", {
                                    required:
                                        "Debes confirmar la contraseña nueva",
                                    validate: (value) =>
                                        value === pwd_nuevo_value ||
                                        "Las contraseñas nuevas no coinciden",
                                })}
                            />
                            {errors.repetir_pwd_nuevo && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.repetir_pwd_nuevo.message}
                                </p>
                            )}
                        </div>

                        <p className="bg-slate-800 border border-slate-700 shadow rounded-lg text-slate-300 p-5 text-center">
                            Por seguridad, tu sesión se cerrará al cambiar la
                            contraseña.
                        </p>

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
                                    <span>Actualizando...</span>
                                </div>
                            ) : (
                                "Actualizar Contraseña"
                            )}
                        </Boton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPasswordPerfil;
