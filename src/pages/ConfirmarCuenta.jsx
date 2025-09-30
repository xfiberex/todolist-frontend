// src/pages/ConfirmarCuenta.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";

// --- Importación de Componentes ---
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

const ConfirmarCuenta = () => {
    // --- Estados ---
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    // --- Parametros ---
    const params = useParams();
    // CORRECCIÓN: Se debe extraer 'token', no 'id'.
    const { token } = params;

    // --- Efectos  ---
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                // CORRECCIÓN: La URL debe usar el token extraído.
                const url = `/usuarios/confirmar/${token}`;
                const { data } = await clienteAxios(url);

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false,
                });
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
            setCargando(false);
        };
        confirmarCuenta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // La dependencia vacía es correcta para que se ejecute solo una vez.

    return (
        <>
            {/* --- SECCIÓN IZQUIERDA: Título --- */}
            <div>
                {/* 
                  NUEVO: Se aplica el mismo estilo de título que en el Login:
                  texto claro (text-slate-200) y gradiente en la palabra clave.
                  Nota: He mantenido tu texto original "Pacientes", pero con el nuevo estilo.
                  Si quieres cambiarlo a "Tareas", puedes hacerlo aquí.
                */}
                <h1 className="text-slate-200 font-black text-5xl md:text-6xl">
                    Confirma tu Cuenta y Administra tus{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        Tareas
                    </span>
                </h1>
            </div>

            {/* --- SECCIÓN DERECHA: Tarjeta de Contenido --- */}
            {/* 
              NUEVO: El contenedor del mensaje ahora usa el estilo de tarjeta blanca
              con borde 'teal' para consistencia visual.
            */}
            <div className="w-full shadow-lg p-8 rounded-xl bg-white border-t-4 border-teal-500">
                {cargando ? (
                    <Spinner />
                ) : (
                    <>
                        <Alerta alerta={alerta} />
                        {cuentaConfirmada && (
                            <Link
                                // NUEVO: El link-botón ahora usa la paleta 'teal'.
                                className="block text-center mt-10 py-3 px-10 mx-auto w-fit
                                text-white border rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
                                to="/"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ConfirmarCuenta;
