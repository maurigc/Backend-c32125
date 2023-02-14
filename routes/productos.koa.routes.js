import Router from "koa-router";
import { getProductos, getProductoById, saveProducto, deleteProducto } from "../controller/productos.koa.controller.js";

const router = new Router({
    prefix: '/api'
});



// Obtener todos los productos.
router.get('/', getProductos)

// Obtener producto por id.
router.get('/:id', getProductoById)

// Agregar un producto.
router.post('/', saveProducto)

// Eliminar un producto.
router.delete('/:id', deleteProducto)





export { router };