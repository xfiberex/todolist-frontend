// src/pages/NuevoPassword.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import AuthBranding from "../components/AuthBranding";
import AuthFormCard from "../components/AuthFormCard";
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const NuevoPassword = () => {
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const [alerta, setAlerta] = useState({});
    
    const { token } = useParams();

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
    const passwordValue = watch("password");

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch {
                setAlerta({ msg: "El enlace no es válido o ha expirado. Por favor, solicita un nuevo correo.", error: true });
            }
        };
        comprobarToken();
    }, [token]);

    const onSubmit = async (data) => {
        setAlerta({});
        try {
            const url = `/usuarios/olvide-password/${token}`;
            const { data: responseData } = await clienteAxios.post(url, { password: data.password });

            setAlerta({ msg: responseData.msg, error: false });
            setPasswordModificado(true);
            reset();
        } catch (error) {
            setAlerta({ msg: error.response?.data?.msg || "Error en el servidor", error: true });
        }
    };

    return (
        <>
            <AuthBranding 
                title={
                    <>
                        Define tu Nueva Contraseña{" "}
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                            y Continúa
                        </span>
                    </>
                }
                subtitle="Elige una contraseña segura y fácil de recordar para proteger tu cuenta."
            />

            <AuthFormCard title="Crear Nueva Contraseña">
                <Alerta alerta={alerta} />

                {tokenValido && !passwordModificado && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label className="text-slate-600 font-bold">Nueva Contraseña</label>
                            <input
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                                {...register("password", {
                                    required: "La nueva contraseña es obligatoria",
                                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                                })}
                            />
                            {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>}
                        </div>
                        <div className="mb-5">
                            <label className="text-slate-600 font-bold">Repetir Nueva Contraseña</label>
                            <input
                                type="password"
                                placeholder="Confirma tu contraseña"
                                className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.repetirPassword ? 'border-red-500' : 'border-slate-300'}`}
                                {...register("repetirPassword", {
                                    required: "Debes confirmar la contraseña",
                                    validate: value => value === passwordValue || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.repetirPassword && <p className="text-red-600 mt-1 text-sm">{errors.repetirPassword.message}</p>}
                        </div>
                        
                        <Boton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (<div className="flex justify-center items-center gap-3"><Spinner/><span>Guardando...</span></div>) : "Guardar Nueva Contraseña"}
                        </Boton>
                    </form>
                )}
                
                {passwordModificado && (
                    <div className="text-center">
                        <Link to="/" className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-lg mt-5 transition-colors">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                )}
            </AuthFormCard>
        </>
    );
};

export default NuevoPassword;