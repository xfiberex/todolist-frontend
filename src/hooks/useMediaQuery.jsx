// src/hooks/useMediaQuery.jsx

import { useState, useEffect } from 'react';

/**
 * Un hook personalizado que devuelve 'true' si la media query de CSS actual coincide.
 * @param {string} query - La media query a evaluar (ej: "(max-width: 767px)").
 * @returns {boolean} - 'true' si la query coincide, 'false' si no.
 */
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Asegurarse de que el código solo se ejecute en el cliente (navegador)
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            
            // Función para actualizar el estado
            const listener = () => {
                setMatches(media.matches);
            };

            // Establecer el estado inicial
            listener();

            // Añadir el listener para cambios futuros (ej: rotar el dispositivo, redimensionar ventana)
            media.addEventListener('change', listener);

            // Limpieza: eliminar el listener cuando el componente se desmonte
            return () => media.removeEventListener('change', listener);
        }
    }, [query]); // Volver a ejecutar el efecto solo si la query cambia

    return matches;
};

export default useMediaQuery;