import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";
import { guardarOrden, obtenerOrden } from "../../helpers/indexedDB.js";

const TareasContext = createContext();

const TareasProvider = ({ children }) => {
    // Estados para las tareas y alertas
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState({});
    const [alerta, setAlerta] = useState({});
    const [alertaEstatica, setAlertaEstatica] = useState({});

    // Estados para los Filtros y orden
    const [busqueda, setBusqueda] = useState("");
    const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
    const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
    const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
    const [orden, setOrden] = useState("orden-manual");

    // Derivados o filtros
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [filtrosActivos, setFiltrosActivos] = useState(0);

    // Estados para el Modal de eliminación
    const [modalEliminar, setModalEliminar] = useState(false);
    const [tareaAEliminar, setTareaAEliminar] = useState(null);
    const [cargandoEliminacion, setCargandoEliminacion] = useState(false);

    // Estados para el Modal de formulario (móvil)
    const [modalFormAbierto, setModalFormAbierto] = useState(false);

    // Estados para el Modal de filtros
    const [modalFiltrosAbierto, setModalFiltrosAbierto] = useState(false);

    const { auth } = useAuth();

    // Cargar tareas del usuario (y aplicar orden guardado)
    useEffect(() => {
        const obtenerTareas = async () => {
            if (!auth?._id) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: tareasDesdeAPI } = await clienteAxios.get("/tareas", config);

                const ordenGuardado = await obtenerOrden(auth._id);

                if (ordenGuardado) {
                    const tareasMap = new Map(tareasDesdeAPI.map(t => [t._id, t]));
                    const tareasExistentes = ordenGuardado
                        .map(id => tareasMap.get(id))
                        .filter(Boolean);
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

    // Aplicar filtros/orden
    useEffect(() => {
        let resultado = [...tareas];

        // Fechas: comparar por día en UTC
        const parseYMDToUtcEpoch = (ymd) => {
            const [yy, mm, dd] = ymd.split("-").map(n => parseInt(n, 10));
            return Date.UTC(yy, mm - 1, dd);
        };
        const taskUtcDayEpoch = (value) => {
            const d = new Date(value);
            return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        };

        // Normalizar rango cuando ambas fechas están presentes
        let desde = filtroFechaDesde || '';
        let hasta = filtroFechaHasta || '';
        if (desde && hasta && desde > hasta) {
            [desde, hasta] = [hasta, desde];
        }

        // Filtro por Búsqueda de texto
        if (busqueda) {
            resultado = resultado.filter(
                t =>
                    t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                    t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtro por Prioridad
        if (["Alta", "Media", "Baja"].includes(filtroPrioridad)) {
            resultado = resultado.filter(t => t.prioridad === filtroPrioridad);
        }

        // Se comparan las fechas como cadenas 'YYYY-MM-DD' para evitar problemas de zona horaria.
        if (desde) {
            const desdeEpoch = parseYMDToUtcEpoch(desde);
            resultado = resultado.filter(t => taskUtcDayEpoch(t.fechaEntrega) >= desdeEpoch);
        }
        if (hasta) {
            const hastaEpoch = parseYMDToUtcEpoch(hasta);
            resultado = resultado.filter(t => taskUtcDayEpoch(t.fechaEntrega) <= hastaEpoch);
        }

        // Si el orden es manual, se respeta el orden actual del array (el del drag-and-drop).
        if (orden !== "orden-manual") {
            const prioridadValor = { Alta: 1, Media: 2, Baja: 3 };
            resultado.sort((a, b) => {
                switch (orden) {
                    case "fecha-desc":
                        return new Date(b.fechaEntrega) - new Date(a.fechaEntrega);
                    case "prioridad-asc":
                        return prioridadValor[a.prioridad] - prioridadValor[b.prioridad];
                    case "prioridad-desc":
                        return prioridadValor[b.prioridad] - prioridadValor[a.prioridad];
                    case "fecha-asc":
                    default:
                        return new Date(a.fechaEntrega) - new Date(b.fechaEntrega);
                }
            });
        }

        setTareasFiltradas(resultado);

        // Calcular número de filtros activos (excluyendo el orden manual)
        let count = 0;
        if (busqueda) count++;
        if (["Alta", "Media", "Baja"].includes(filtroPrioridad)) count++;
        if (filtroFechaDesde) count++;
        if (filtroFechaHasta) count++;
        if (orden && orden !== "orden-manual") count++;
        setFiltrosActivos(count);
    }, [tareas, busqueda, filtroPrioridad, filtroFechaDesde, filtroFechaHasta, orden]);

    // --- FUNCIONES ---

    const guardarTarea = async tarea => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        };

        if (tarea.id) {
            // Actualizar
            try {
                const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
                const tareasActualizadas = tareas.map(t => (t._id === data._id ? data : t));
                setTareas(tareasActualizadas);
                setTarea({});
                return { msg: "Tarea actualizada correctamente", error: false };
            } catch (error) {
                return { msg: error.response.data.msg, error: true };
            }
        } else {
            // Crear
            try {
                const { data } = await clienteAxios.post("/tareas", tarea, config);
                setTareas([data, ...tareas]);
                return { msg: "Tarea creada correctamente", error: false };
            } catch (error) {
                return { msg: error.response.data.msg, error: true };
            }
        }
    };

    const setEdicion = tarea => {
        setTarea(tarea);
        setModalFormAbierto(true);
    };

    const cancelarEdicionTarea = () => {
        setTarea({});
        setModalFormAbierto(false);
    };

    const eliminarTarea = async () => {
    if (!tareaAEliminar) return;

        setCargandoEliminacion(true);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            };

            await clienteAxios.delete(`/tareas/${tareaAEliminar._id}`, config);

            const tareasActualizadas = tareas.filter(t => t._id !== tareaAEliminar._id);
            setTareas(tareasActualizadas);

            setAlerta({ msg: "Tarea Eliminada Correctamente", error: false });
            handleCloseModalEliminar();
        } catch (error) {
            console.error(error);
        } finally {
            setCargandoEliminacion(false);
        }
    };

    const cambiarEstadoTarea = async id => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            };
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

    // Modal eliminar: abrir (recibe tarea)
    const handleModalEliminar = tarea => {
        setTareaAEliminar(tarea);
        setModalEliminar(true);
    };

    // Modal eliminar: cerrar
    const handleCloseModalEliminar = () => {
        setModalEliminar(false);
        setTimeout(() => setTareaAEliminar(null), 300);
    };

    // Modal form: abrir (nueva tarea)
    const handleAbrirModalForm = () => {
        setTarea({}); // Asegurarse de que no hay datos de edición
        setModalFormAbierto(true);
    };

    // Modal form: cerrar
    const handleCerrarModalForm = () => {
        setModalFormAbierto(false);
    };

    // Modal filtros
    const handleAbrirModalFiltros = () => setModalFiltrosAbierto(true);
    const handleCerrarModalFiltros = () => setModalFiltrosAbierto(false);

    // Reset filtros y orden manual
    const limpiarFiltros = () => {
        setBusqueda("");
        setFiltroFechaDesde("");
        setFiltroFechaHasta("");
        setFiltroPrioridad("todas");
        setOrden("orden-manual");
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
                filtrosActivos,

                // Modal eliminar
                modalEliminar,
                handleModalEliminar,
                handleCloseModalEliminar,
                tareaAEliminar,
                cargandoEliminacion,

                // Modal form (móvil)
                modalFormAbierto,
                handleAbrirModalForm,
                handleCerrarModalForm,

                // Modal filtros
                modalFiltrosAbierto,
                handleAbrirModalFiltros,
                handleCerrarModalFiltros,
            }}
        >
            <div onKeyDown={e => e.key === "Escape" && handleCerrarModalForm()}>{children}</div>
        </TareasContext.Provider>
    );
};

export { TareasProvider };
export default TareasContext;
