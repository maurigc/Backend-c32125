import { mensajesDao } from "../factory/factory.js";
import { normalizarMensajes } from "../scripts/normalizarMensajes.js";
import RepositorioMensajes from "../repository/mensajes.repository.js";


const repoMensajes = new RepositorioMensajes();

// Guarda el mensaje enviado en la Db y devuelve todos los mensajes normalizados
const guardarYNormalizarMsj = async(data) => {
    await repoMensajes.save(data);
        
    const arrayConMensajesNuevos = await repoMensajes.getAll();
                
    return normalizarMensajes({id: "mensajes", arrayConMensajesNuevos});
}

// Obtiene los mensajes de la Db y los devuelve normalizados
const obtenerYNormalizarMsj = async() => {
    const todosMensajes = await repoMensajes.getAll();
    

    return normalizarMensajes({id: "mensajes", todosMensajes});
}


export { guardarYNormalizarMsj, obtenerYNormalizarMsj };