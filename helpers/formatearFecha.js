// En tu archivo /helpers/formatearFecha.js

const formatearFecha = (fecha) => {
    // Es una buena práctica añadir una comprobación por si la fecha es nula
    if (!fecha) return "Fecha no disponible";

    const nuevaFecha = new Date(fecha);

    // Creamos un objeto de opciones para mayor claridad
    const opciones = {
        dateStyle: "long",
        // Forzamos a que la fecha se formatee en el Tiempo Universal Coordinado (UTC),
        // neutralizando el efecto de la zona horaria del navegador.
        timeZone: "UTC",
    };

    return new Intl.DateTimeFormat("es-ES", opciones).format(nuevaFecha);
};

export default formatearFecha;
