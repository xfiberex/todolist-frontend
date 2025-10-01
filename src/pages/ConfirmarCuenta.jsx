// src/pages/ConfirmarCuenta.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import AuthBranding from "../components/AuthBranding";
import Alerta from "../components/Alerta";

// --- Iconos para Éxito y Error ---
const IconoExito = () => (
    <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const IconoError = () => (
    <svg className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const ConfirmarCuenta = () => {
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const { token } = useParams();

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${token}`;
                const { data } = await clienteAxios(url);
                setAlerta({ msg: data.msg, error: false });
            } catch (error) {
                setAlerta({ msg: error.response?.data?.msg || "Error al confirmar la cuenta", error: true });
            }
            setCargando(false);
        };
        confirmarCuenta();
    }, [token]);

    return (
        <>
            <AuthBranding 
                title={
                    <>
                        ¡Casi Listo! Confirma tu{" "}
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                            Cuenta
                        </span>
                    </>
                }
                subtitle="Este último paso asegura que tu cuenta es segura y está lista para ser usada."
            />
            
            {/* 
                Usamos AuthFormCard pero sin el prop 'title' para tener
                más control sobre el contenido interno.
            */}
            <div className="w-full max-w-lg mx-auto">
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-teal-500 p-8 text-center">
                    
                    {cargando ? (
                        <p className="text-slate-600">Verificando...</p>
                    ) : (
                        <>
                            {alerta.error ? <IconoError/> : <IconoExito/>}
                            <Alerta alerta={alerta} />
                            
                            {!alerta.error && (
                                <Link
                                    className="block text-center mt-10 py-3 px-10 mx-auto w-fit text-white border rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
                                    to="/"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ConfirmarCuenta;