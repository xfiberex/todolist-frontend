// src/pages/Register.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const Register = () => {
    // Alertas y estado de control
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [cuentaCreada, setCuentaCreada] = useState(false);

    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset, // Para limpiar el formulario
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            repetirPassword: "",
        },
    });

    // Observar el valor de la contraseña para poder compararlo
    const passwordValue = watch("password");

    // Función de envío del formulario
    const onSubmit = async (data) => {
        setAlertaEstatica({});
        try {
            // Se quita 'repetirPassword' del objeto a enviar al backend
            const { ...usuario } = data;

            const apiResponse = await clienteAxios.post(
                "/usuarios/registrar",
                usuario
            );

            setAlertaEstatica({ msg: apiResponse.data.msg, error: false });
            setCuentaCreada(true);
            reset(); // Limpia los campos del formulario tras el éxito
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
                    Crea tu Cuenta y Administra tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <AlertaEstatica alerta={alertaEstatica} />

                {!cuentaCreada && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.nombre
                                        ? "border-red-500"
                                        : "border-slate-300"
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
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Apellido
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu apellido..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.apellido
                                        ? "border-red-500"
                                        : "border-slate-300"
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

                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña..."
                                className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-slate-300"
                                }`}
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
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
                                Repetir Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Repite tu contraseña..."
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
                                    <span>Creando Cuenta...</span>
                                </div>
                            ) : (
                                "Crear Cuenta"
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
                        to="/olvide-password"
                    >
                        Olvidé mi contraseña
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Register;
