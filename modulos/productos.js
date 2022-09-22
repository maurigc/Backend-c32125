const express = require("express");
const { Router } = express;
const contenedor = require("../index.js");


const router = Router();



// Rutas raiz de producto.
router.get("/", (req, res) => {

    const todosProductos = contenedor.getAll();

    todosProductos.length === 0 ? res.status(400).json("No hay ningun producto guardado") : res.status(200).json(todosProductos);
    
})



// Ruta para obtener producto por id.
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const productoEncontrado = contenedor.getById(parseInt(id));

    productoEncontrado ? res.status(200).json(productoEncontrado) : res.status(400).json({error: `El producto con ID:${id} no se encontró`});
    
})



// Ruta para guardar un producto.
router.post("/", (req, res) => {
    
    const productoParaGuardar = req.body;

    const idProductoGuardado = contenedor.save({...productoParaGuardar});

    res.status(200).json(`Producto Guardado. ID: ${idProductoGuardado}`);

})



// Ruta para actualizar un producto ya existente.
router.put("/:id", (req, res) => {
    const {name, price} = req.body;
    const { id } = req.params;

    contenedor.update(parseInt(id), name, price);

    res.status(200).json("put hecho");
    
})



// Ruta para eliminar un producto por su id.
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    const productoEncontrado = contenedor.getById(parseInt(id));
    
    if(!productoEncontrado){
        res.status(400).json(`El producto con ID: ${id} no se encontrò`);

    }else{
        contenedor.deleteById(parseInt(id));

        res.status(200).json(`Archivo eliminado con exito`);
    }
    
})


module.exports = router;