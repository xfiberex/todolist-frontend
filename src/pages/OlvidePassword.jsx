// src/pages/OlvidePassword.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import AuthBranding from "../components/AuthBranding";
import AuthFormCard from "../components/AuthFormCard";
import { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const OlvidePassword = () => {
    const [alertaEstatica, setAlertaEstatica] = useState({});
    const [enviado, setEnviado] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        setAlertaEstatica({});
        try {
            const { data: responseData } = await clienteAxios.post("/usuarios/olvide-password", data);
            setAlertaEstatica({ msg: responseData.msg, error: false });
            setEnviado(true);
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
                        ¿Olvidaste tu Contraseña?{" "}
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                            Recupérala
                        </span>
                    </>
                }
                subtitle="Ingresa tu correo electrónico y te enviaremos las instrucciones para reestablecer tu contraseña."
            />
            
            <AuthFormCard title="Recuperar Acceso">
                <AlertaEstatica alerta={alertaEstatica} />

                {!enviado ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label className="text-slate-600 font-bold">Correo Electrónico</label>
                            <input
                                type="email"
                                placeholder="tu.correo@email.com"
                                className={`border w-full p-3 mt-2 bg-slate-50 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Formato de correo no válido" }
                                })}
                            />
                            {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}
                        </div>

                        <Boton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Enviando...</span></div>) : "Enviar Instrucciones"}
                        </Boton>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-slate-600 mb-6">Hemos enviado las instrucciones a tu correo. Por favor, revisa tu bandeja de entrada (y la carpeta de spam).</p>
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

export default OlvidePassword;