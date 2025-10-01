// src/pages/CambiarPasswordPerfil.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import ProfileLayout from "../layout/ProfileLayout";
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const CambiarPasswordPerfil = () => {
    const { actualizarPasswordPerfil, cerrarSesionAuth } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
    const pwd_nuevo_value = watch("pwd_nuevo");

    const onSubmit = async (data) => {
        setAlerta({});
        try {
            const respuesta = await actualizarPasswordPerfil(data);
            setAlerta(respuesta);
            if (!respuesta.error) {
                reset();
                setIsLoggingOut(true);
                setTimeout(() => {
                    sessionStorage.setItem("mensajePostLogout", "Contraseña actualizada. Por favor, inicia sesión de nuevo.");
                    cerrarSesionAuth();
                }, 3000);
            }
        } catch (error){
            setAlerta({ msg: error.response?.data?.msg || "Ocurrió un error", error: true });
        }
    };

    return (
        <ProfileLayout>
            {/* Encabezado del Contenido */}
            <div className="mb-8">
                <h2 className="font-black text-3xl text-slate-100">Cambiar Contraseña</h2>
                <p className="text-xl mt-2 text-slate-400">
                    Asegura tu cuenta actualizando tu contraseña regularmente.
                </p>
            </div>

            {/* Tarjeta del Formulario */}
            <div className="w-full bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {alerta.msg && <Alerta alerta={alerta} />}

                    <div className="mb-5">
                        <label className="font-bold text-sm text-slate-300 block mb-2">Contraseña Actual</label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña actual..."
                            className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.pwd_actual ? 'border-red-500' : 'border-slate-700'}`}
                            {...register("pwd_actual", { required: "La contraseña actual es obligatoria" })}
                        />
                        {errors.pwd_actual && <p className="text-red-600 mt-1 text-sm">{errors.pwd_actual.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-5">
                            <label className="font-bold text-sm text-slate-300 block mb-2">Contraseña Nueva</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña nueva..."
                                className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.pwd_nuevo ? 'border-red-500' : 'border-slate-700'}`}
                                {...register("pwd_nuevo", { required: "La contraseña nueva es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                            />
                            {errors.pwd_nuevo && <p className="text-red-600 mt-1 text-sm">{errors.pwd_nuevo.message}</p>}
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-sm text-slate-300 block mb-2">Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                placeholder="Repite la nueva contraseña..."
                                className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.repetir_pwd_nuevo ? 'border-red-500' : 'border-slate-700'}`}
                                {...register("repetir_pwd_nuevo", { required: "Confirma la contraseña", validate: value => value === pwd_nuevo_value || "Las contraseñas no coinciden" })}
                            />
                            {errors.repetir_pwd_nuevo && <p className="text-red-600 mt-1 text-sm">{errors.repetir_pwd_nuevo.message}</p>}
                        </div>
                    </div>
                    
                    <p className="text-sm text-slate-400 mt-2 mb-6">
                        Por seguridad, tu sesión se cerrará después de cambiar la contraseña y deberás volver a iniciar sesión.
                    </p>
                    
                    <div className="text-right">
                        <Boton type="submit" disabled={isSubmitting || isLoggingOut}>
                             {isLoggingOut ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Cerrando Sesión...</span></div>
                            ) : isSubmitting ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Actualizando...</span></div>
                            ) : "Actualizar Contraseña"}
                        </Boton>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
};

export default CambiarPasswordPerfil;