import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";

// --- Importación de Componentes ---
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner"; // Se añade Spinner

const Register = () => {
    // --- Estados para Campos ---
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    // --- Estados para Alertas ---
    const [alerta, setAlerta] = useState({}); // Alerta dinámica para validaciones
    const [alertaEstatica, setAlertaEstatica] = useState({}); // Alerta estática para resultado final

    // --- Estados de Control ---
    const [cargando, setCargando] = useState(false);
    const [cuentaCreada, setCuentaCreada] = useState(false);

    // --- Funciones ---
    const registerSubmit = async (e) => {
        e.preventDefault();

        // --- LÓGICA: Validaciones usan la alerta dinámica ---
        if ([nombre, apellido, email, password, repetirPassword].includes("")) {
            setAlerta({ msg: "Hay campos vacíos", error: true });
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: "Las contraseñas no coinciden", error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({
                msg: "La contraseña es muy corta, agrega mínimo 6 caracteres",
                error: true,
            });
            return;
        }

        // --- Limpiamos alertas antes de enviar ---
        setAlerta({});
        setAlertaEstatica({});
        setCargando(true);

        try {
            // Se implementa el fakeDelay para mejorar la UX
            const fakeDelay = new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const apiCall = clienteAxios.post("/usuarios/registrar", {
                nombre,
                apellido,
                email,
                password,
            }); // Ruta común para crear usuarios

            const [apiResponse] = await Promise.all([apiCall, fakeDelay]);
            const { data } = apiResponse;

            // El resultado final usa la alerta estática
            setAlertaEstatica({ msg: data.msg, error: false });
            setCuentaCreada(true); // Ocultamos el formulario

            // Limpiamos los campos del formulario
            setNombre("");
            setApellido("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            // El error de API también usa la alerta estática
            setAlertaEstatica({ msg: error.response.data.msg, error: true });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            {/* --- SECCIÓN IZQUIERDA: Título --- */}
            <div>
                {/* 
                  NUEVO: Se aplica el mismo estilo de título que en el Login:
                  - Texto claro (text-slate-200) para el fondo oscuro.
                  - Span con gradiente para el texto de acento.
                */}
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Crea tu Cuenta y Administra tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- SECCIÓN DERECHA: Formulario --- */}
            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <AlertaEstatica alerta={alertaEstatica} />

                {!cuentaCreada && (
                    <form onSubmit={registerSubmit}>
                        <Alerta alerta={alerta} />

                        {/* 
                          NUEVO: Se aplican los estilos de input refinados
                          a todos los campos del formulario.
                        */}
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Apellido
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu apellido..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                        {/* Se repiten los estilos para los demás campos... */}
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Correo
                            </label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Repetir contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Repite tu contraseña..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={repetirPassword}
                                onChange={(e) =>
                                    setRepetirPassword(e.target.value)
                                }
                            />
                        </div>

                        {/* El componente Boton ya tiene los nuevos estilos */}
                        <Boton type="submit" disabled={cargando}>
                            {cargando ? (
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

                {/* 
                  NUEVO: Los enlaces de navegación ahora usan 'text-teal-600' en el hover
                  para mantener la consistencia con la nueva paleta de colores.
                */}
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
