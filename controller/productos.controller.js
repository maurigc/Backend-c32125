import { logConsola, logWarn, logError } from "../scripts/logger.js";
import { generarProductos } from "../scripts/crearProductos.js"; 
import { obtenerUser, buscarProductoPorId, guardarProducto, eliminarProducto, guardarYActualizar, todosProductos } from "../service/productos.service.js";


const getTest = (req, res) => {
    const productosFaker = generarProductos(5);

    res.render("pages/indexTest", { productosFaker: productosFaker })
}


const getMain = async (req, res) => { 
    try {
        res.render("pages/indexLogin");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error)
    }
    
}


const getProductos = async (req, res) => {
    try {
        const username = await obtenerUser(req.session.usuario)

        res.render("pages/index", { usuario: username });
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    
    
}


const getProductsByID = async (req, res) => {
    try {
        const { id } = req.params;
        
        const productoEncontrado = await buscarProductoPorId(id)

        if(!productoEncontrado){
            logWarn.warn(`producto con ID: ${id} inexistente.`)
            res.status(400).json({error: `El producto con ID:${id} no se encontró`});
        }else{
            
            res.status(200).json(productoEncontrado)

        } 
    } catch (error) {
        logConsola.info(error);
    }
      
}


const postProductos = async (req, res) => {
    try {
        const productoParaGuardar = req.body;
        
        await guardarProducto(productoParaGuardar)

        res.status(200).json(productoParaGuardar);
        // res.redirect("/api");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    

}




const deleteProductos = async (req, res) => {
    try {
        const { id } = req.params;
    
        const productoEncontrado = await buscarProductoPorId(id)

        if(!productoEncontrado){
            logWarn.warn(`producto con ID: ${id} inexistente.`)
            res.status(400).json(`El producto con ID: ${id} no se encontrò`);

        }else{
            await eliminarProducto(id);

            res.status(200).json(`Archivo eliminado con exito`);
        }
    } catch (error) {
        logConsola.info(error)
    }
    
    
}

const emitirNuevoProductos = async (data) => {
    try {
        return await guardarYActualizar(data);
        
    } catch (error) {
        logError.error(error);
    }
}

export  { 
    getTest, 
    getMain, 
    getProductos, 
    getProductsByID, 
    postProductos,  
    deleteProductos, 
    emitirNuevoProductos
}