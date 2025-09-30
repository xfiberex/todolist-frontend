// src/components/Footer.jsx

const Footer = () => {
    return (
        <footer
            // NUEVO: Se aplica el mismo fondo slate oscuro que en el Header
            // y se añade un borde superior para delimitarlo.
            className="py-8 bg-slate-800 border-t border-slate-700 mt-10"
        >
            <p className="text-center font-bold text-slate-400">
                ToDoList - Gestor de {""}
                {/* NUEVO: El color de acento se actualiza a teal. */}
                <span className="text-teal-500">Tareas</span>
            </p>
        </footer>
    );
};

export default Footer;
