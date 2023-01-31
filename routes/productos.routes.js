import { Router } from "express";
import { checkAuthenticated } from "../middlewares/checkAuthenticated.js";
import { getProductos, getProductsByID, postProductos, deleteProductos, getMain, getTest } from "../controller/productos.controller.js";

const router = Router();



// Ruta de prueba usando Mock. 
router.get("/productos-test", getTest)


// Ruta principal
router.get("/", getMain)



// Rutas raiz de producto. Agregar checkAuthenticated
router.get("/productos",  getProductos);



// Ruta para obtener producto por id.
router.get("/productos/:id", getProductsByID)



// Ruta para guardar un producto.
router.post("/productos", postProductos)




// Ruta para eliminar un producto por su id.
router.delete("/productos/:id", deleteProductos)


export { router };