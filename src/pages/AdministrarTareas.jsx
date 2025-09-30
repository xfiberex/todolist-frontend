// src/pages/AdministrarTareas.jsx

import { useState } from "react";
import { Transition } from "@headlessui/react";
// --- 1. IMPORTAR nuestro nuevo hook ---
import useMediaQuery from "../hooks/useMediaQuery"; 
import FormularioTarea from "../components/FormularioTarea";
import ListadoTareas from "../components/ListaTareas";

import FiltrosTareas from "../components/FiltrosTareas";

const AdministrarTareas = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    // --- 2. USAR EL HOOK para detectar si estamos en vista móvil ---
    // Tailwind usa 768px para el breakpoint 'md'. 'max-width: 767px' se aplica a todo lo que esté por debajo.
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <div className="flex flex-col md:flex-row gap-12">
            {/* El botón sigue oculto en escritorio (md:hidden), correcto. */}
            <button
                type="button"
                className="bg-teal-600 text-white font-bold 
                           uppercase mx-10 p-3 rounded-lg mb-5 md:hidden 
                           cursor-pointer hover:bg-teal-700 transition-colors"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
                {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
            </button>
            
            {/* 
              --- 3. LÓGICA DE VISIBILIDAD ACTUALIZADA ---
              - En móvil (isMobile=true), 'show' depende de `mostrarFormulario`.
              - En escritorio (isMobile=false), 'show' siempre es 'true', por lo que el formulario es visible
                y la transición solo se ejecuta al cargar la página.
            */}
            <Transition
                show={isMobile ? mostrarFormulario : true}
                as="div"
                className="md:w-full md:max-w-md lg:max-w-lg" // Clases estáticas para layout
                enter="transition-all ease-out duration-500"
                enterFrom="opacity-0 -translate-y-10 max-h-0"
                enterTo="opacity-100 translate-y-0 max-h-screen"
                leave="transition-all ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0 max-h-screen"
                leaveTo="opacity-0 -translate-y-10 max-h-0"
            >
                <div className="overflow-hidden md:static md:overflow-visible">
                     {/* En escritorio, aseguramos que la posición y overflow sean estáticos */}
                    <FormularioTarea />
                </div>
            </Transition>

            <div className="flex-1">
                {/* --- AÑADIMOS EL PANEL DE FILTROS AQUÍ --- */}
                <FiltrosTareas />
                
                <ListadoTareas />
            </div>
        </div>
    );
};

export default AdministrarTareas;