import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";

// --- Importación de Componentes ---
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const CambiarPasswordPerfil = () => {
    const { actualizarPasswordPerfil, cerrarSesionAuth } = useAuth();

    // --- Estados para el Formulario y Control ---
    const [passwords, setPasswords] = useState({
        pwd_actual: "",
        pwd_nuevo: "",
        repetir_pwd_nuevo: "",
    });
    // Se definen estados para cada tipo de alerta y para la carga
    const [alerta, setAlerta] = useState({}); // Dinámica para validaciones
    const [alertaEstatica, setAlertaEstatica] = useState({}); // Estática para resultados
    const [cargando, setCargando] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        // --- Validaciones usan la alerta dinámica ---
        if (Object.values(passwords).some(campo => campo === "")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        if (passwords.pwd_nuevo.length < 6) {
            setAlerta({
                msg: "La contraseña nueva debe tener mínimo 6 caracteres",
                error: true,
            });
            return;
        }
        if (passwords.pwd_nuevo !== passwords.repetir_pwd_nuevo) {
            setAlerta({
                msg: "Las contraseñas nuevas no coinciden",
                error: true,
            });
            return;
        }

        // --- Limpiamos alertas y activamos el estado de carga ---
        setAlerta({});
        setAlertaEstatica({});
        setCargando(true);

        try {
            const fakeDelay = new Promise(resolve => setTimeout(resolve, 1500));
            const apiCall = actualizarPasswordPerfil(passwords);
            const [respuesta] = await Promise.all([apiCall, fakeDelay]);

            setAlertaEstatica(respuesta);

            // 3. SI LA OPERACIÓN FUE EXITOSA, FORZAR EL CIERRE DE SESIÓN
            if (!respuesta.error) {
                // Limpiamos el formulario inmediatamente para feedback visual
                setPasswords({
                    pwd_actual: "",
                    pwd_nuevo: "",
                    repetir_pwd_nuevo: "",
                });

                setIsLoggingOut(true);

                // Programamos el cierre de sesión para darle tiempo al usuario de leer el mensaje.
                setTimeout(() => {
                    // Guardamos un mensaje específico en sessionStorage para mostrarlo en el Login.
                    sessionStorage.setItem(
                        "mensajePostLogout",
                        "Contraseña actualizada. Por favor, inicia sesión de nuevo."
                    );
                    cerrarSesionAuth();
                    // RutaProtegida se encargará de la redirección al login.
                }, 3000); // 3 segundos
            }
        } catch {
            setAlertaEstatica({
                msg: "Ocurrió un error inesperado al cambiar la contraseña",
                error: true,
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <AdminNav />

            {/* NUEVO: Títulos adaptados al tema oscuro */}
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
                {/* NUEVO: Contenedor del formulario oscuro */}
                <div className="w-full md:w-1/2 bg-slate-800 border border-slate-700 shadow rounded-lg p-8">
                    <AlertaEstatica alerta={alertaEstatica} />

                    <form onSubmit={handleSubmit}>
                        <Alerta alerta={alerta} />

                        {/* NUEVO: Labels e Inputs rediseñados */}
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="pwd_actual"
                                value={passwords.pwd_actual}
                                placeholder="Escribe tu contraseña actual..."
                                onChange={e =>
                                    setPasswords({
                                        ...passwords,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Contraseña Nueva
                            </label>
                            <input
                                type="password"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="pwd_nuevo"
                                value={passwords.pwd_nuevo}
                                placeholder="Escribe tu contraseña nueva..."
                                onChange={e =>
                                    setPasswords({
                                        ...passwords,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase font-bold text-slate-300">
                                Repetir Contraseña Nueva
                            </label>
                            <input
                                type="password"
                                className="w-full p-3 mt-3 rounded-lg bg-slate-900 border border-slate-700 text-white
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                name="repetir_pwd_nuevo"
                                value={passwords.repetir_pwd_nuevo}
                                placeholder="Repite tu contraseña nueva..."
                                onChange={e =>
                                    setPasswords({
                                        ...passwords,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <p className="bg-slate-800 border border-slate-700 shadow rounded-lg text-slate-300 p-5 text-center">
                            Por motivos de seguridad, tu sesión se cerrará después de cambiar la
                            contraseña y deberás volver a iniciar sesión.
                        </p>

                        {/* Se reemplaza el input por el componente Boton */}
                        <Boton type="submit" disabled={cargando || isLoggingOut}>
                            {isLoggingOut ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Cerrando Sesión...</span>
                                </div> // Mensaje final
                            ) : cargando ? (
                                <div className="flex justify-center items-center gap-3">
                                    <Spinner />
                                    <span>Actualizando...</span>
                                </div>
                            ) : (
                                "Actualizar Contraseña" // Estado por defecto
                            )}
                        </Boton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPasswordPerfil;
