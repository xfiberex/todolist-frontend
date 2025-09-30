// src/pages/NuevoPassword.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const NuevoPassword = () => {
    // Estado de la UI
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const [alerta, setAlerta] = useState({});

    // Token de la URL
    const { token } = useParams();

    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const passwordValue = watch("password");

    // Efecto para comprobar la validez del token al cargar
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setAlerta({ msg: "Coloca tu nueva contraseña", error: false });
                setTokenValido(true);
            } catch {
                setAlerta({ msg: "Hubo un error con el enlace", error: true });
            }
        };
        comprobarToken();
    }, [token]);

    // Función de envío del formulario
    const onSubmit = async (data) => {
        setAlerta({});
        try {
            const url = `/usuarios/olvide-password/${token}`;
            const apiResponse = await clienteAxios.post(url, {
                password: data.password,
            });

            setAlerta({ msg: apiResponse.data.msg, error: false });
            setPasswordModificado(true);
            reset();
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || "Error en el servidor",
                error: true,
            });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Reestablece tu contraseña y no Pierdas tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <Alerta alerta={alerta} />

                {tokenValido && !passwordModificado && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu nueva contraseña..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-slate-300"
                                }`}
                                {...register("password", {
                                    required:
                                        "La nueva contraseña es obligatoria",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "La contraseña debe tener al menos 6 caracteres",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Repetir Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Repite tu nueva contraseña..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.repetirPassword
                                        ? "border-red-500"
                                        : "border-slate-300"
                                }`}
                                {...register("repetirPassword", {
                                    required: "Debes confirmar la contraseña",
                                    validate: (value) =>
                                        value === passwordValue ||
                                        "Las contraseñas no coinciden",
                                })}
                            />
                            {errors.repetirPassword && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.repetirPassword.message}
                                </p>
                            )}
                        </div>

                        <Boton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Guardando...</span>
                                </div>
                            ) : (
                                "Guardar Nueva Contraseña"
                            )}
                        </Boton>
                    </form>
                )}

                {passwordModificado && (
                    <Link
                        className="block text-center mt-10 py-3 px-10 mx-auto w-fit text-white border rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
                        to="/"
                    >
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </>
    );
};

export default NuevoPassword;
