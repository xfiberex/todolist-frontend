// src/pages/ActualizarPerfil.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import ProfileLayout from "../layout/ProfileLayout";
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const ActualizarPerfil = () => {
    const { auth, actualizarPerfil, cerrarSesionAuth } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
    const emailActual = watch("email");
    
    useEffect(() => {
        if(auth.nombre) {
            reset({ nombre: auth.nombre, apellido: auth.apellido, email: auth.email });
        }
    }, [auth, reset]);
    
    const onSubmit = async (data) => {
        setAlerta({});
        try {
            const emailCambiado = auth.email !== data.email;
            // Pasamos el _id del usuario autenticado para la actualización en el backend
            const resultado = await actualizarPerfil({ ...data, _id: auth._id });
            setAlerta(resultado);

            if (!resultado.error && emailCambiado) {
                setIsLoggingOut(true);
                setTimeout(() => {
                    sessionStorage.setItem('mensajePostLogout', 'Revisa tu nueva bandeja de entrada para confirmar tu cuenta.');
                    cerrarSesionAuth();
                }, 4000);
            }
        } catch {
            setAlerta({ msg: "Ocurrió un error al actualizar el perfil", error: true });
        }
    };

    return (
        <ProfileLayout>
            {/* Encabezado del Contenido */}
            <div className="mb-8">
                <h2 className="font-black text-3xl text-slate-100">Editar Perfil</h2>
                <p className="text-xl mt-2 text-slate-400">
                    Modifica tu información personal. Los cambios en tu nombre se reflejarán en toda la aplicación.
                </p>
            </div>

            {/* Tarjeta del Formulario */}
            <div className="w-full bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {alerta.msg && <Alerta alerta={alerta} />}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-5">
                            <label className="font-bold text-sm text-slate-300 block mb-2">Nombre</label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre..."
                                className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.nombre ? 'border-red-500' : 'border-slate-700'}`}
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && <p className="text-red-600 mt-1 text-sm">{errors.nombre.message}</p>}
                        </div>

                        <div className="mb-5">
                            <label className="font-bold text-sm text-slate-300 block mb-2">Apellido</label>
                            <input
                                type="text"
                                placeholder="Ingresa tu apellido..."
                                className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.apellido ? 'border-red-500' : 'border-slate-700'}`}
                                {...register("apellido", { required: "El apellido es obligatorio" })}
                            />
                            {errors.apellido && <p className="text-red-600 mt-1 text-sm">{errors.apellido.message}</p>}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold text-sm text-slate-300 block mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electronico..."
                            className={`w-full p-3 rounded-lg bg-slate-900 border text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                            {...register("email", { required: "El correo es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Formato no válido" }})}
                        />
                        {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}

                        {auth.email !== emailActual && (
                            <p className="text-yellow-400/80 text-sm mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                                <strong>Atención:</strong> Si cambias tu correo, tu sesión se cerrará y deberás volver a confirmar tu cuenta desde la nueva dirección.
                            </p>
                        )}
                    </div>
                    
                    <div className="text-right">
                        <Boton type="submit" disabled={isSubmitting || isLoggingOut}>
                            {isLoggingOut ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Cerrando...</span></div>
                            ) : isSubmitting ? (<div className="flex justify-center items-center gap-3"><Spinner /><span>Guardando...</span></div>
                            ) : "Guardar Cambios"}
                        </Boton>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
};

export default ActualizarPerfil;