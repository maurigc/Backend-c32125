import { Router } from "express";
import { contenedorUno } from "../containers/index.contenedor.js";
import { generarProductos } from "../scripts/crearProductos.js";
import { checkAuthenticated } from "../middlewares/checkAuthenticated.js";
import { logConsola, logWarn } from "../scripts/logger.js";

const router = Router();

// Ruta de prueba usando Mock. 
router.get("/productos-test", (req, res) => {
    const productosFaker = generarProductos(5);

    res.render("pages/indexTest", { productosFaker: productosFaker })
})

// Ruta principal
router.get("/", async (req, res) => { 
    try {
        res.render("pages/indexLogin");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error)
    }
    
})


// Rutas raiz de producto.
router.get("/productos", checkAuthenticated, async (req, res) => {
    try {
        const username = req.session.usuario;

        res.render("pages/index", { usuario: username });
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    
    
})



// Ruta para obtener producto por id.
router.get("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const productoEncontrado = contenedorUno.getProductById(parseInt(id));

        if(!productoEncontrado){
            logWarn.warn(`producto con ID: ${id} inexistente.`)
            res.status(400).json({error: `El producto con ID:${id} no se encontró`});
        }else{
            res.status(200).json(productoEncontrado)
        } 
    } catch (error) {
        logConsola.info(error);
    }
    
    
})



// Ruta para guardar un producto.
router.post("/productos", async (req, res) => {
    try {
        const productoParaGuardar = req.body;

        contenedorUno.saveProduct({...productoParaGuardar});

        res.redirect("/api");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    

})



// Ruta para actualizar un producto ya existente.
router.put("/productos/:id", async (req, res) => {
    try {
        const {name, price} = req.body;
        const { id } = req.params;

        contenedorUno.updateProduct(parseInt(id), name, price);

        res.status(200).json("El producto se actualizó con éxito.");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    
    
})



// Ruta para eliminar un producto por su id.
router.delete("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
    
        const productoEncontrado = contenedorUno.getProductById(parseInt(id));
    
        if(!productoEncontrado){
            logWarn.warn(`producto con ID: ${id} inexistente.`)
            res.status(400).json(`El producto con ID: ${id} no se encontrò`);

        }else{
            contenedorUno.deleteProductById(parseInt(id));

            res.status(200).json(`Archivo eliminado con exito`);
        }
    } catch (error) {
        logConsola.info(error)
    }
    
    
})


export { router };