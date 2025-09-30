import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // 1. Importar el hook de React Hook Form
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import Boton from "../components/Boton";
import Spinner from "../components/Spinner";

const Login = () => {
    // Hooks de estado y navegación
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    // 2. Inicializar React Hook Form
    //    - register: Vincula los inputs al formulario.
    //    - handleSubmit: Envuelve nuestra función de envío y gestiona la validación.
    //    - formState: Provee información sobre el estado del formulario.
    //      - errors: Objeto con los errores de validación.
    //      - isSubmitting: Reemplaza nuestro estado 'cargando' manual. Es 'true' mientras se ejecuta la función de envío.
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { // Es una buena práctica definir los valores iniciales
            email: "",
            password: "",
        },
    });

    // Efecto para mostrar mensajes después de un logout (ej. cambio de contraseña).
    useEffect(() => {
        const mensaje = sessionStorage.getItem("mensajePostLogout");
        if (mensaje) {
            setAlerta({ msg: mensaje, error: false });
            sessionStorage.removeItem("mensajePostLogout"); // Limpiar para no mostrarlo de nuevo
        }
    }, []);

    // 3. La función de envío ahora recibe los 'data' del formulario directamente.
    //    Ya no necesita 'e.preventDefault()' ni validaciones manuales.
    const onSubmit = async (data) => {
        setAlerta({}); // Limpia alertas previas
        try {
            // El 'fakeDelay' se puede quitar si ya no se desea simular una carga
            const fakeDelay = new Promise((resolve) => setTimeout(resolve, 1000));
            const apiCall = clienteAxios.post("/usuarios/login", data);

            const [apiResponse] = await Promise.all([apiCall, fakeDelay]);
            
            localStorage.setItem("token", apiResponse.data.token);
            setAuth(apiResponse.data);
            navigate("/admin");

        } catch (error) {
            setAlerta({ msg: error.response?.data?.msg || "Error en el servidor", error: true });
        }
    };

    return (
        <>
            {/* --- Sección Izquierda: Título y Bienvenida --- */}
            <div>
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Inicia Sesión y Administra tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- Sección Derecha: Formulario --- */}
            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                {alerta.msg && <Alerta alerta={alerta} />}

                {/* 4. El 'onSubmit' del formulario se gestiona con handleSubmit de React Hook Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-5">
                        <label className="uppercase text-slate-600 block text-xl font-bold">
                            Correo
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo..."
                            className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                       focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                       ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                            // 5. 'register' conecta el input y define las reglas de validación.
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "El formato del correo no es válido",
                                },
                            })}
                        />
                        {/* Muestra el mensaje de error si la validación falla */}
                        {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-slate-600 block text-xl font-bold">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña..."
                            className={`border w-full p-3 mt-3 bg-slate-50 rounded-lg 
                                       focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                       ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                        />
                        {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* 6. El estado 'disabled' del botón ahora es controlado por 'isSubmitting'. */}
                    <Boton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
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