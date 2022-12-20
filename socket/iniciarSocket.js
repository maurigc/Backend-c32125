// *********************import Contenedores********************
import MensajesDao from "../DAOs/mensajes.dao.js";
import Contenedor from "../containers/contenedorSQL.js";
import { config } from "../config.js";
// *********************import Scripts*************************
import { normalizarMensajes } from "../scripts/normalizarMensajes.js";
import { generarProductos } from "../scripts/crearProductos.js";

import { logConsola, logError } from "../scripts/logger.js";


//_________________________________________________________________________________________________________________________
// Instanciado de conetenedores
const contenedorProductos = new Contenedor(config.mysql, "productos");
const contenedorMensajes = new MensajesDao();


const iniciarSocket = (io) => {
    io.on("connection", async (socket) => {
        logConsola.info("Conectado");
    
        // EVENTOS PARA PRODUCTOS
        // const todosProductos = await contenedorProductos.getAll();
        const todosProductos = generarProductos(5);
        socket.emit("tabla", todosProductos);
    
        
        socket.on("nuevoProducto",async (data) => {
            try {
                await contenedorProductos.save(data);
        
                const productosActualizado = await contenedorProductos.getAll();
        
                io.sockets.emit("tabla", productosActualizado);
                
            } catch (error) {
                logError.error(error);
            }
        })
    
        // EVENTOS PARA MENSAJES
        const todosMensajes = await contenedorMensajes.getAll();
        
        const mensajesNormalizados = normalizarMensajes({id: "mensajes", todosMensajes});
        
        socket.emit("mensaje", mensajesNormalizados);
    
        socket.on("nuevoMensaje", async (data) => {
            try {
                await contenedorMensajes.save(data);
        
                const arrayConMensajesNuevos = await contenedorMensajes.getAll();
                
                const mensajesNormalizados = normalizarMensajes({id: "mensajes", arrayConMensajesNuevos});
               
                io.sockets.emit("mensaje", mensajesNormalizados);
                
            } catch (error) {
                logError.error(error);
            }
        }) 
        
        
    
    })
}


export { iniciarSocket };