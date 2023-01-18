import MensajesDao from "../DAOs/mensajes.dao.js";
import { normalizarMensajes } from "../scripts/normalizarMensajes.js";

const contenedorMensajes = new MensajesDao();

// Guarda el mensaje enviado en la Db y devuelve todos los mensajes normalizados
const guardarYNormalizarMsj = async(data) => {
    await contenedorMensajes.save(data);
        
    const arrayConMensajesNuevos = await contenedorMensajes.getAll();
                
    return normalizarMensajes({id: "mensajes", arrayConMensajesNuevos});
}

// Obtiene los mensajes de la Db y los devuelve normalizados
const obtenerYNormalizarMsj = async() => {
    const todosMensajes = await contenedorMensajes.getAll();
        
    return normalizarMensajes({id: "mensajes", todosMensajes});
}


export { guardarYNormalizarMsj, obtenerYNormalizarMsj };