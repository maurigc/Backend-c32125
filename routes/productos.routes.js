import { Router } from "express";
import { contenedorUno } from "../containers/index.contenedor.js";
import { authLogueo } from "../middlewares/authLogeo.js";
import { generarProductos } from "../scripts/crearProductos.js";

const router = Router();

// Ruta de prueba usando Mock. 
router.get("/productos-test", (req, res) => {
    const productosFaker = generarProductos(5);

    res.render("pages/indexTest", { productosFaker: productosFaker })
})

// Ruta principal
router.get("/", (req, res) => { 

    res.render("pages/indexLogin");
})


// Rutas raiz de producto.
router.get("/productos", authLogueo, (req, res) => {

    const usuario = req.session.usuario;

    res.render("pages/index", { usuario: usuario })
    
})



// Ruta para obtener producto por id.
router.get("/productos/:id", (req, res) => {
    const { id } = req.params;

    const productoEncontrado = contenedorUno.getProductById(parseInt(id));

    productoEncontrado ? res.status(200).json(productoEncontrado) : res.status(400).json({error: `El producto con ID:${id} no se encontró`});
    
})



// Ruta para guardar un producto.
router.post("/productos", (req, res) => {
    
    const productoParaGuardar = req.body;

    contenedorUno.saveProduct({...productoParaGuardar});

    res.redirect("/api");

})



// Ruta para actualizar un producto ya existente.
router.put("/productos/:id", (req, res) => {
    const {name, price} = req.body;
    const { id } = req.params;

    contenedorUno.updateProduct(parseInt(id), name, price);

    res.status(200).json("put hecho");
    
})



// Ruta para eliminar un producto por su id.
router.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    
    const productoEncontrado = contenedorUno.getProductById(parseInt(id));
    
    if(!productoEncontrado){
        res.status(400).json(`El producto con ID: ${id} no se encontrò`);

    }else{
        contenedorUno.deleteProductById(parseInt(id));

        res.status(200).json(`Archivo eliminado con exito`);
    }
    
})


export { router };