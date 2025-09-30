import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";

// --- Importación de Componentes ---
import Alerta, { AlertaEstatica } from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const OlvidePassword = () => {
    // --- Estados ---
    const [email, setEmail] = useState("");
    const [cargando, setCargando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    // --- Estados para cada tipo de alerta ---
    const [alerta, setAlerta] = useState({}); // Para validaciones dinámicas
    const [alertaEstatica, setAlertaEstatica] = useState({}); // Para el resultado final estático

    // --- Funciones ---
    const olvidePasswordSubmit = async (e) => {
        e.preventDefault();

        // Usamos la alerta dinámica para validaciones rápidas
        if (email === "") {
            setAlerta({ msg: "El correo es obligatorio", error: true });
            return;
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            setAlerta({
                msg: "El formato del correo no es válido",
                error: true,
            });
            return;
        }

        // Limpiamos ambas alertas antes de empezar la petición
        setAlerta({});
        setAlertaEstatica({});
        setCargando(true);

        try {
            const fakeDelay = new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const apiCall = clienteAxios.post("/usuarios/olvide-password", {
                email,
            });
            const [apiResponse] = await Promise.all([apiCall, fakeDelay]);
            const { data } = apiResponse;

            // Usamos la alerta estática para el mensaje final y persistente
            setAlertaEstatica({
                msg: data.msg,
                error: false,
            });
            setEnviado(true);
            setEmail("");
        } catch (error) {
            // El error de API también es un mensaje final y persistente
            setAlertaEstatica({
                msg: error.response.data.msg,
                error: true,
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            {/* --- SECCIÓN IZQUIERDA: Título --- */}
            <div>
                {/* NUEVO: Se aplica el estilo de título coherente con el nuevo diseño. */}
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Recupera tu Acceso y no Pierdas tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- SECCIÓN DERECHA: Formulario --- */}
            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <AlertaEstatica alerta={alertaEstatica} />

                {!enviado && (
                    <form onSubmit={olvidePasswordSubmit}>
                        <Alerta alerta={alerta} />
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Correo
                            </label>
                            {/* NUEVO: Se aplica el estilo de input refinado. */}
                            <input
                                type="email"
                                placeholder="Ingresa tu correo..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* El componente Boton hereda los estilos de Teal */}
                        <Boton type="submit" disabled={cargando}>
                            {cargando ? (
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

                {/* NUEVO: Enlaces de navegación actualizados a la nueva paleta. */}
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
