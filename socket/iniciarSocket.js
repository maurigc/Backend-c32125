// *********************import Scripts*************************
import { generarProductos } from "../scripts/crearProductos.js";
import { logConsola, logError } from "../scripts/logger.js";
import { emitirNuevoProductos } from "../controller/productos.controller.js"
import { guardarYNormalizarMsj, obtenerYNormalizarMsj } from "../service/mensaje.service.js";


const iniciarSocket = (io) => {
    io.on("connection", async (socket) => {
        logConsola.info("Conectado");
    
        // EVENTOS PARA PRODUCTOS
        // const todosProductos = await contenedorProductos.getAll();
        const todosProductos = generarProductos(5);
        socket.emit("tabla", todosProductos);
    
        
        socket.on("nuevoProducto", async(data) => {
            try {
                const productosActualizado = emitirNuevoProductos(data)
    
                io.sockets.emit("tabla", productosActualizado);
                
            } catch (error) {
                logError.error(error);
            }
        })
    
        // EVENTOS PARA MENSAJES
        const mensajesNormalizados = await obtenerYNormalizarMsj();
        
        socket.emit("mensaje", mensajesNormalizados);
    
        socket.on("nuevoMensaje", async (data) => {
            try {
                const mensajesNormalizados = await guardarYNormalizarMsj(data)
               
                io.sockets.emit("mensaje", mensajesNormalizados);
                
            } catch (error) {
                logError.error(error);
            }
        }) 
        
    })
}


export { iniciarSocket };