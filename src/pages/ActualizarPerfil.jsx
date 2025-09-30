import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";

// --- Importación de Componentes ---
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const ActualizarPerfil = () => {
    // --- Hook de Autenticación ---
    const { auth, actualizarPerfil, cerrarSesionAuth } = useAuth();

    // --- Estados para el Formulario y Control ---
    const [perfil, setPerfil] = useState({});
    const [cargando, setCargando] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // --- Se definen estados separados para cada tipo de alerta ---
    const [alerta, setAlerta] = useState({}); // Dinámica para validaciones
    const [alertaEstatica, setAlertaEstatica] = useState({}); // Estática para resultados

    useEffect(() => {
        // Esto ya era correcto, se popula el formulario con los datos del usuario
        setPerfil(auth);
    }, [auth]);

    const ActualizarPerfilSubmit = async (e) => {
        e.preventDefault();

        const { nombre, apellido, email } = perfil;
        if ([nombre, apellido, email].includes("")) {
            setAlerta({
                msg: "El Nombre, Apellido y Correo son obligatorios",
                error: true,
            });
            return;
        }

        // --- 1. DETECTAR SI EL NOMBRE O APELLIDO CAMBIARON ---
        // Comparamos el estado original de 'auth' con el estado 'perfil' que el usuario modificó.
        const nombreCambiado = auth.nombre !== perfil.nombre || auth.apellido !== perfil.apellido;
        const emailCambiado = auth.email !== perfil.email;

        // --- Limpiamos alertas y activamos estado de carga ---
        setAlerta({});
        setAlertaEstatica({});
        setCargando(true);

        try {
            const fakeDelay = new Promise((resolve) => setTimeout(resolve, 1500));
             const [resultado] = await Promise.all([actualizarPerfil(perfil), fakeDelay]);

            setAlertaEstatica(resultado);

            // --- 2. VERIFICAR SI LA ACTUALIZACIÓN FUE EXITOSA Y SI EL NOMBRE CAMBIÓ ---
            if (!resultado.error) {
                if (emailCambiado) {
                    // Si el email cambió, forzamos el cierre de sesión después de un delay
                    // para que el usuario pueda leer el mensaje.
                    setIsLoggingOut(true);

                    setTimeout(() => {
                        sessionStorage.setItem('mensajePostLogout', 'Revisa tu nueva bandeja de entrada para confirmar tu cuenta.');
                        cerrarSesionAuth();
                        // La redirección al login se manejará automáticamente por RutaProtegida
                    }, 4000); // 4 segundos de delay

                } else if (nombreCambiado) {
                    // Si solo el nombre cambió, simplemente recargamos
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        } catch {
            setAlertaEstatica({
                msg: "Ocurrió un error al actualizar el perfil",
                error: true,
            });
        } finally {
            setCargando(false);
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
                {/* 
                  NUEVO: El contenedor del formulario ahora es oscuro y usa bordes sutiles,
                  en lugar de ser una tarjeta blanca con sombra.
                */}
                <div className="w-full md:w-1/2 bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                    <AlertaEstatica alerta={alertaEstatica} />

                    <form onSubmit={ActualizarPerfilSubmit}>
                        <Alerta alerta={alerta} />

                        {/* NUEVO: Labels e Inputs rediseñados para el tema oscuro */}
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="nombre"
                                value={perfil.nombre || ""}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* --- 3. AÑADIR CAMPO DE APELLIDO --- */}
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Apellido
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="apellido" // el 'name' es importante
                                value={perfil.apellido || ""}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Correo
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="email"
                                value={perfil.email || ""}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />

                            {/* 4. MENSAJE DE ADVERTENCIA CONDICIONAL */}
                            {/* Se muestra solo si el email en el formulario es diferente al original */}
                            {auth.email !== perfil.email && (
                                <p className="text-yellow-400 p-5 border border-slate-700 shadow rounded-lg mt-5">
                                    <strong>Atención:</strong> Si cambias tu correo, tu cuenta se marcará como no confirmada y deberás verificar la nueva dirección. Se cerrará tu sesión actual.
                                </p>
                            )}
                        </div>

                        {/* Se reemplaza el input por el componente Boton con estado de carga */}
                        <Boton type="submit" disabled={cargando || isLoggingOut}>
                            {isLoggingOut ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Cerrando Sesión...</span>
                                </div> // Mensaje durante la espera del logout
                            ) : cargando ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Guardando...</span>
                                </div>
                            ) : (
                                "Guardar Cambios" // Estado por defecto
                            )}
                        </Boton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ActualizarPerfil;
