// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

// --- Paginas Publicas ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

// --- Paginas Privadas
import AdministrarTareas from "./pages/AdministrarTareas";
import ActualizarPerfil from "./pages/ActualizarPerfil";
import CambiarPasswordPerfil from "./pages/CambiarPasswordPerfil";

// --- Autenticación a cada ruta necesaria ---
import { AuthProvider } from "./context/AuthProvider";
import { TareasProvider } from "./context/TareasProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <TareasProvider>
                    <Routes>
                        {/* Rutas publicas */}
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="registrar" element={<Register />} />
                            <Route
                                path="olvide-password"
                                element={<OlvidePassword />}
                            />
                            <Route
                                path="olvide-password/:token"
                                element={<NuevoPassword />}
                            />
                            {/* CORRECCIÓN: El parámetro es :token, no :id */}
                            <Route
                                path="confirmar/:token"
                                element={<ConfirmarCuenta />}
                            />
                        </Route>

                        {/* Rutas privadas para el administrador */}
                        <Route path="/admin" element={<RutaProtegida />}>
                            <Route index element={<AdministrarTareas />} />
                            <Route
                                path="perfil"
                                element={<ActualizarPerfil />}
                            />
                            <Route
                                path="cambiar-password-perfil"
                                element={<CambiarPasswordPerfil />}
                            />
                        </Route>
                    </Routes>
                </TareasProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;