# Frontend - Gestor de Tareas

SPA en React + Vite con Tailwind. Incluye login/registro, confirmación por email, recuperación de contraseña, panel de tareas con drag & drop y filtros avanzados (modal con transiciones y FABs en móvil).

## ✨ Características

- React 19 + Vite 7
- Enrutamiento con `react-router-dom` (rutas públicas y protegidas)
- Context API para auth y tareas
- Axios con interceptores (JWT en headers y logout automático en 401)
- Tailwind (estilo oscuro)
- DnD con `@dnd-kit` (orden manual persistido en IndexedDB)
- Filtros avanzados: búsqueda, prioridad, rango de fechas y orden; modal con transición y FABs en móvil; contador de filtros activos y botón “Limpiar” (desktop y móvil)

## 🛠️ Requisitos

- Node.js 18+

## ⚙️ Variables de entorno

Crea un archivo `.env` en `todolist-frontend/` con:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## 🚀 Desarrollo (Windows PowerShell)

```powershell
cd "c:\Users\User\Desktop\Cursos y Proyectos\03 - Proyectos de desarrollo\02-ToDoList\todolist-frontend"
npm install
npm run dev
```

Abrirá la app en `http://localhost:5173`.

## 🔗 Backend necesario

Asegúrate de tener el backend corriendo (ver `todolist-backend/README.md`) y que `VITE_BACKEND_URL` apunte a su URL.

## 📦 Build de producción

```powershell
npm run build
```

Genera `dist/` listo para despliegue. Puedes previsualizar con:

```powershell
npm run preview
```

## 🧭 Navegación

- Público: `/` (login), `/registrar`, `/confirmar/:token`, `/olvide-password`, `/olvide-password/:token`
- Privado: `/admin` (panel), `/admin/perfil`, `/admin/cambiar-password-perfil`

## � Notas de UX

- En móvil hay 3 FABs: añadir tarea (+), abrir filtros (embudo, con badge), y limpiar filtros (X, visible solo si hay filtros activos).
- En desktop, botones en el header: “Añadir Nueva Tarea”, “Filtros” (con contador), y “Limpiar” visible si hay filtros.
