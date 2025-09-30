import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";

// --- Importación de Componentes ---
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const Login = () => {
    // --- Estados para Campos ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // --- Estados para las Alertas ---
    const [alerta, setAlerta] = useState({});

    // --- Estado para la carga ---
    const [cargando, setCargando] = useState(false);

    // --- Autenticación ---
    const { setAuth } = useAuth();

    // --- Navegación ---
    const navigate = useNavigate();

    // 5. AÑADIR USEEFFECT PARA LEER EL MENSAJE DE SESSIONSTORAGE
    useEffect(() => {
        const mensaje = sessionStorage.getItem('mensajePostLogout');
        if (mensaje) {
            setAlerta({
                msg: mensaje,
                error: false // Asumimos que es un mensaje informativo
            });
            sessionStorage.removeItem('mensajePostLogout'); // Limpiar para que no se muestre de nuevo
        }
    }, []); // El array vacío asegura que se ejecute solo una vez al cargar el componente

    // --- Funciones ---
    const loginSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlerta({ msg: "Hay campos vacíos", error: true });
            return;
        }

        setAlerta({});
        setCargando(true);

        try {
            // Creamos una promesa para el retardo ficticio de 1 segundos
            const fakeDelay = new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            // Hacemos la llamada a la API
            const apiCall = clienteAxios.post("/usuarios/login", {
                email,
                password,
            });

            // Esperamos a que tanto la llamada a la API como el retardo de 2 segundos terminen
            const [apiResponse] = await Promise.all([apiCall, fakeDelay]);
            const { data } = apiResponse;

            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/admin");
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            {/* --- SECCIÓN IZQUIERDA: Título y Bienvenida --- */}
            <div>
                {/* 
                  NUEVO: El texto del título ahora es claro (text-slate-200) para 
                  resaltar sobre el fondo oscuro del nuevo layout.
                */}
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Inicia Sesión y Administra tus{" "}
                    {/* 
                      NUEVO: Se aplica un gradiente de Teal a Cyan al texto
                      clave para un efecto visual moderno y atractivo.
                    */}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- SECCIÓN DERECHA: Formulario --- */}
            <div
                className="w-full shadow-lg p-8 rounded-xl bg-white 
                           border-t-4 border-teal-500" // NUEVO: Un borde superior sutil con el color de acento
            >
                {alerta.msg && <Alerta alerta={alerta} />}
                <form onSubmit={loginSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-slate-600 block text-xl font-bold">
                            Correo
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo..."
                            // NUEVO: Estilos de input refinados para un look más limpio.
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
                            // NUEVO: Se aplican los mismos estilos refinados al input de contraseña.
                            className="border border-slate-300 w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                       focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* El componente Boton ya hereda los nuevos estilos de Teal */}
                    <Boton type="submit" disabled={cargando}>
                        {cargando ? (
                            <div className="flex justify-center items-center gap-3">
                                <Spinner />
                                <span>Iniciando Sesión...</span>
                            </div>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Boton>
                </form>

                <nav className="my-10 lg:flex lg:justify-between">
                    {/* NUEVO: Se actualiza el color del hover para que coincida con la nueva paleta. */}
                    <Link
                        className="block text-center my-5 text-slate-500 hover:text-teal-600"
                        to="/registrar"
                    >
                        ¿No tienes una cuenta? Regístrate
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

export default Login;
