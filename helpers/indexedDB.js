// src/db/indexedDB.js

const DB_NAME = "TareasAppDB";
const STORE_NAME = "ordenTareas";
const DB_VERSION = 1;

let db;

/**
 * Inicializa y abre la conexión con la base de datos IndexedDB.
 * Crea el almacén de objetos si es la primera vez.
 * @returns {Promise<IDBDatabase>} Una promesa que se resuelve con la instancia de la base de datos.
 */
const initDB = () => {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db);
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error("Error al abrir la base de datos IndexedDB:", event);
            reject("Error al abrir IndexedDB");
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        // Este evento solo se dispara si la versión de la BD cambia (o en la primera creación)
        request.onupgradeneeded = (event) => {
            const tempDb = event.target.result;
            // Creamos el "almacén de objetos" (como una tabla)
            // Usaremos el 'userId' como la clave única para cada registro.
            if (!tempDb.objectStoreNames.contains(STORE_NAME)) {
                tempDb.createObjectStore(STORE_NAME, { keyPath: "userId" });
            }
        };
    });
};

/**
 * Guarda el orden de las tareas para un usuario específico en IndexedDB.
 * @param {string} userId - El ID del usuario.
 * @param {Array<string>} orden - Un array de los IDs de las tareas en el orden deseado.
 * @returns {Promise<void>}
 */
export const guardarOrden = async (userId, orden) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        // 'readwrite' porque vamos a modificar datos.
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        
        // .put() hace un "upsert": inserta si no existe, o actualiza si ya existe la clave (userId).
        // eslint-disable-next-line no-unused-vars
        const request = store.put({ userId, orden });

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = (event) => {
            console.error("Error al guardar el orden:", event);
            reject("No se pudo guardar el orden en IndexedDB");
        };
    });
};

/**
 * Obtiene el orden de las tareas para un usuario específico de IndexedDB.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array<string>|null>} Una promesa que se resuelve con el array de IDs o null si no se encuentra.
 */
export const obtenerOrden = async (userId) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        // 'readonly' porque solo vamos a leer.
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);

        // Obtenemos el registro por su clave.
        const request = store.get(userId);

        request.onsuccess = (event) => {
            // Si el resultado existe, devolvemos el array 'orden', si no, null.
            resolve(event.target.result ? event.target.result.orden : null);
        };

        request.onerror = (event) => {
            console.error("Error al obtener el orden:", event);
            reject("No se pudo obtener el orden desde IndexedDB");
        };
    });
};