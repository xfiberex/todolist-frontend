// src/context/TareasProvider.jsx

import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";
import { guardarOrden, obtenerOrden } from "../../helpers/indexedDB.js";

const TareasContext = createContext();

const TareasProvider = ({ children }) => {
    // ESTADOS
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState({});
    const [alerta, setAlerta] = useState({});
    const [alertaEstatica, setAlertaEstatica] = useState({});

    // ESTADOS PARA FILTROS Y ORDEN
    const [busqueda, setBusqueda] = useState("");
    const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
    const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
    const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
    const [orden, setOrden] = useState("fecha-asc");

    // ESTADO PARA TAREAS FILTRADAS Y ORDENADAS
    const [tareasFiltradas, setTareasFiltradas] = useState([]);

    // --- ESTADOS PARA EL MODAL DE ELIMINACIÓN ---
    const [modalEliminar, setModalEliminar] = useState(false);
    const [tareaAEliminar, setTareaAEliminar] = useState(null);
    const [cargandoEliminacion, setCargandoEliminacion] = useState(false);

    const { auth } = useAuth();

    // EFECTO: OBTENER TAREAS
    useEffect(() => {
        const obtenerTareas = async () => {
            if (!auth?._id) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
                const { data: tareasDesdeAPI } = await clienteAxios.get("/tareas", config);

                const ordenGuardado = await obtenerOrden(auth._id);

                if (ordenGuardado) {
                    const tareasMap = new Map(tareasDesdeAPI.map(t => [t._id, t]));
                    const tareasExistentes = ordenGuardado.map(id => tareasMap.get(id)).filter(Boolean);
                    const tareasNuevas = tareasDesdeAPI.filter(t => !ordenGuardado.includes(t._id));
                    setTareas([...tareasExistentes, ...tareasNuevas]);
                } else {
                    setTareas(tareasDesdeAPI);
                }
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
                setTareas([]);
            }
        };
        obtenerTareas();
    }, [auth]);

    // EFECTO: APLICAR FILTROS Y ORDEN
    useEffect(() => {
        let resultado = [...tareas];

        if (busqueda) {
            resultado = resultado.filter(t => t.nombre.toLowerCase().includes(busqueda.toLowerCase()) || t.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
        }

        if (["Alta", "Media", "Baja"].includes(filtroPrioridad)) {
            resultado = resultado.filter(t => t.prioridad === filtroPrioridad);
        }

        if (filtroFechaDesde) {
            resultado = resultado.filter(t => new Date(t.fechaEntrega) >= new Date(filtroFechaDesde));
        }
        if (filtroFechaHasta) {
            const fechaHastaAjustada = new Date(filtroFechaHasta);
            fechaHastaAjustada.setDate(fechaHastaAjustada.getDate() + 1);
            resultado = resultado.filter(t => new Date(t.fechaEntrega) < fechaHastaAjustada);
        }

        const prioridadValor = { Alta: 1, Media: 2, Baja: 3 };
        resultado.sort((a, b) => {
            switch (orden) {
                case "fecha-desc": return new Date(b.fechaEntrega) - new Date(a.fechaEntrega);
                case "prioridad-asc": return prioridadValor[a.prioridad] - prioridadValor[b.prioridad];
                case "prioridad-desc": return prioridadValor[b.prioridad] - prioridadValor[a.prioridad];
                case "fecha-asc":
                default: return new Date(a.fechaEntrega) - new Date(b.fechaEntrega);
            }
        });

        setTareasFiltradas(resultado);
    }, [tareas, busqueda, filtroPrioridad, filtroFechaDesde, filtroFechaHasta, orden]);

    // --- FUNCIONES ---

    const guardarTarea = async tarea => {
        const token = localStorage.getItem("token");
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

        if (tarea.id) { // Actualizar
            try {
                const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
                const tareasActualizadas = tareas.map(t => (t._id === data._id ? data : t));
                setTareas(tareasActualizadas);
                setTarea({});
                return { msg: "Tarea actualizada correctamente", error: false };
            } catch (error) {
                return { msg: error.response.data.msg, error: true };
            }
        } else { // Crear
            try {
                const { data } = await clienteAxios.post("/tareas", tarea, config);
                setTareas([data, ...tareas]);
                return { msg: "Tarea creada correctamente", error: false };
            } catch (error) {
                return { msg: error.response.data.msg, error: true };
            }
        }
    };

    const setEdicion = tarea => setTarea(tarea);

    const cancelarEdicionTarea = () => setTarea({});

    const eliminarTarea = async () => {
        if (!tareaAEliminar) return; // Salvaguarda

        setCargandoEliminacion(true);
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
            
            await clienteAxios.delete(`/tareas/${tareaAEliminar._id}`, config);
            
            const tareasActualizadas = tareas.filter(t => t._id !== tareaAEliminar._id);
            setTareas(tareasActualizadas);
            
            setAlerta({ msg: 'Tarea Eliminada Correctamente', error: false });
            handleCloseModalEliminar(); // Cierra el modal después del éxito
        
        } catch (error) {
            console.error(error);
            // Puedes establecer una alerta de error aquí si lo deseas
        } finally {
            setCargandoEliminacion(false);
        }
    };

    const cambiarEstadoTarea = async id => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);
            const tareasActualizadas = tareas.map(t => (t._id === data._id ? data : t));
            setTareas(tareasActualizadas);
        } catch (error) {
            console.error(error.response);
        }
    };

    const reordenarTareas = async tareasReordenadas => {
        setTareas(tareasReordenadas);
        if (auth?._id) {
            const ordenIds = tareasReordenadas.map(t => t._id);
            try {
                await guardarOrden(auth._id, ordenIds);
            } catch (error) {
                console.error("No se pudo guardar el orden de las tareas:", error);
            }
        }
    };

    // --- Función para ABRIR el modal ---
    // Recibe la tarea completa para poder mostrar su nombre
    const handleModalEliminar = (tarea) => {
        setTareaAEliminar(tarea);
        setModalEliminar(true);
    };

    // --- Función para CERRAR el modal ---
    const handleCloseModalEliminar = () => {
        setModalEliminar(false);
        // Pequeño delay para que no se vea el cambio de nombre antes de que se cierre
        setTimeout(() => setTareaAEliminar(null), 300); 
    };

    const limpiarFiltros = () => {
        setBusqueda("");
        setFiltroFechaDesde("");
        setFiltroFechaHasta("");
        setFiltroPrioridad("todas");
        setOrden("fecha-asc");
    };

    return (
        <TareasContext.Provider
            value={{
                tareas: tareasFiltradas,
                tarea,
                alerta,
                alertaEstatica,
                setAlertaEstatica,
                guardarTarea,
                setEdicion,
                eliminarTarea,
                cambiarEstadoTarea,
                cancelarEdicionTarea,
                reordenarTareas,
                setBusqueda,
                setFiltroFechaDesde,
                setFiltroFechaHasta,
                setFiltroPrioridad,
                setOrden,
                limpiarFiltros,
                filtros: {
                    busqueda,
                    fechaDesde: filtroFechaDesde,
                    fechaHasta: filtroFechaHasta,
                    prioridad: filtroPrioridad,
                    orden,
                },

                // --- Exportar props para el modal ---
                modalEliminar,
                handleModalEliminar,
                handleCloseModalEliminar,
                tareaAEliminar,
                cargandoEliminacion,
            }}
        >
            {children}
        </TareasContext.Provider>
    );
};

export { TareasProvider };
export default TareasContext;