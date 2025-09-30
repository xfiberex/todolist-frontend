// src/pages/OlvidePassword.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const OlvidePassword = () => {
    // Estado de la UI
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [enviado, setEnviado] = useState(false);

    // useForm hook
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { email: "" } });

    // Función de envío del formulario
    const onSubmit = async (data) => {
        setAlertaEstatica({});
        try {
            const apiResponse = await clienteAxios.post(
                "/usuarios/olvide-password",
                data
            );

            setAlertaEstatica({ msg: apiResponse.data.msg, error: false });
            setEnviado(true);
            reset();
        } catch (error) {
            setAlertaEstatica({
                msg: error.response?.data?.msg || "Error en el servidor",
                error: true,
            });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Recupera tu Acceso y no Pierdas tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <AlertaEstatica alerta={alertaEstatica} />

                {!enviado && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Correo
                            </label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-slate-300"
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
                )}

                <nav className="my-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-slate-500 hover:text-teal-600"
                        to="/"
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link
                        className="block text-center my-5 text-slate-500 hover:text-teal-600"
                        to="/registrar"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default OlvidePassword;
