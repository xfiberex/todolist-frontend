// src/pages/Register.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import AuthBranding from "../components/AuthBranding";
import AuthFormCard from "../components/AuthFormCard";
import { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const Register = () => {
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [cuentaCreada, setCuentaCreada] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        setAlertaEstatica({});
        try {
            const { ...usuario } = data;
            const { data: responseData } = await clienteAxios.post("/usuarios/registrar", usuario);
            setAlertaEstatica({ msg: responseData.msg, error: false });
            setCuentaCreada(true);
            reset();
        } catch (error) {
            setAlertaEstatica({ msg: error.response?.data?.msg || "Error en el servidor", error: true });
        }
    };

    return (
        <>
            <AuthBranding 
                title={
                    <>
                        Crea tu Cuenta y{" "}
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                            Toma el Control
                        </span>
                    </>
                }
                subtitle="El primer paso hacia una mejor organización está a solo un clic de distancia."
            />
            
            <AuthFormCard title="Crear Cuenta Nueva">
                <AlertaEstatica alerta={alertaEstatica} />
                
                {/* Mostramos el formulario o un mensaje de éxito */}
                {!cuentaCreada ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Campo Nombre y Apellido en una fila */}
                        <div className="grid md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label className="text-slate-600 font-bold">Nombre</label>
                                <input type="text" placeholder="Tu nombre" className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.nombre ? 'border-red-500' : 'border-slate-300'}`} {...register("nombre", { required: "El nombre es obligatorio" })}/>
                                {errors.nombre && <p className="text-red-600 mt-1 text-sm">{errors.nombre.message}</p>}
                            </div>
                            <div>
                                <label className="text-slate-600 font-bold">Apellido</label>
                                <input type="text" placeholder="Tu apellido" className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.apellido ? 'border-red-500' : 'border-slate-300'}`} {...register("apellido", { required: "El apellido es obligatorio" })} />
                                {errors.apellido && <p className="text-red-600 mt-1 text-sm">{errors.apellido.message}</p>}
                            </div>
                        </div>

                        {/* Campos restantes */}
                        <div className="mb-5"><label className="text-slate-600 font-bold">Correo Electrónico</label><input type="email" placeholder="tu.correo@email.com" className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} {...register("email", { required: "El correo es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Formato de correo no válido" } })} />{errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}</div>
                        <div className="mb-5"><label className="text-slate-600 font-bold">Contraseña</label><input type="password" placeholder="Mínimo 6 caracteres" className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.password ? 'border-red-500' : 'border-slate-300'}`} {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } })} />{errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>}</div>
                        <div className="mb-5"><label className="text-slate-600 font-bold">Repetir Contraseña</label><input type="password" placeholder="Confirma tu contraseña" className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.repetirPassword ? 'border-red-500' : 'border-slate-300'}`} {...register("repetirPassword", { required: "Debes confirmar la contraseña", validate: value => value === passwordValue || "Las contraseñas no coinciden" })} />{errors.repetirPassword && <p className="text-red-600 mt-1 text-sm">{errors.repetirPassword.message}</p>}</div>

                        <Boton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Creando...</span></div>) : "Crear Cuenta"}
                        </Boton>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-slate-600 mb-6">¡Todo listo! Revisa tu bandeja de entrada y sigue las instrucciones para confirmar tu cuenta.</p>
                        <Link to="/" className="text-teal-600 font-bold hover:underline">
                            Volver a Iniciar Sesión
                        </Link>
                    </div>
                )}
                
                <nav className="mt-8 text-center text-sm">
                    <Link className="block text-slate-500 hover:text-teal-600" to="/">
                        ¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span>
                    </Link>
                </nav>
            </AuthFormCard>
        </>
    );
};

export default Register;