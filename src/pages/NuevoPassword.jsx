import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";

// --- Importación de Componentes ---
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const NuevoPassword = () => {
    // --- Estados ---
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);

    // --- Parametros ---
    const params = useParams();
    const { token } = params;

    // --- Efecto de comprobación del token (lógica original correcta) ---
    useEffect(() => {
        const comprobarToken = async () => {
            setCargando(true); // Opcional: mostrar carga mientras se valida el token
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setAlerta({
                    msg: "Coloca tu nueva contraseña",
                    error: false,
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg:
                        error.response?.data?.msg ||
                        "Hubo un error con el enlace",
                    error: true,
                });
            } finally {
                setCargando(false);
            }
        };
        comprobarToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // La dependencia vacía es correcta

    // --- Función de envío ---
    const nuevoPasswordSubmit = async (e) => {
        e.preventDefault();

        // --- Validaciones ---
        if ([password, repetirPassword].includes("")) {
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

        setAlerta({});
        setCargando(true);

        try {
            const fakeDelay = new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const url = `/usuarios/olvide-password/${token}`;
            const apiCall = clienteAxios.post(url, { password });

            const [apiResponse] = await Promise.all([apiCall, fakeDelay]);
            const { data } = apiResponse;

            setAlerta({
                msg: data.msg,
                error: false,
            });

            // Se actualiza el estado para cambiar la UI, pero no se redirige.
            setPasswordModificado(true);

            // Se limpian los campos del formulario.
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            setAlerta({
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
                {/* NUEVO: Título adaptado al tema oscuro con el gradiente característico. */}
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Reestablece tu contraseña y no Pierdas tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- SECCIÓN DERECHA: Tarjeta de Formulario --- */}
            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                <Alerta alerta={alerta} />

                {tokenValido && !passwordModificado && (
                    <form onSubmit={nuevoPasswordSubmit}>
                        {/* NUEVO: Labels e Inputs rediseñados para el tema oscuro */}
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu nueva contraseña..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-slate-600 block text-xl font-bold">
                                Repetir Contraseña Nueva
                            </label>
                            <input
                                type="password"
                                placeholder="Repite tu nueva contraseña..."
                                className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                           focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={repetirPassword}
                                onChange={(e) =>
                                    setRepetirPassword(e.target.value)
                                }
                            />
                        </div>
                        {/* El Boton ya tiene el estilo 'teal' correcto */}
                        <Boton type="submit" disabled={cargando}>
                            {/* ... */}
                        </Boton>
                    </form>
                )}

                {passwordModificado && (
                    <nav className="mt-10">
                        {/* NUEVO: El link-botón de Iniciar Sesión usa la paleta 'teal'. */}
                        <Link
                            className="block text-center py-3 px-10 mx-auto w-fit
                                     text-white border rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
                            to="/"
                        >
                            Iniciar Sesión
                        </Link>
                    </nav>
                )}
            </div>
        </>
    );
};

export default NuevoPassword;
