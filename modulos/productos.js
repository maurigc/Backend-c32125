const express = require("express");
const { Router } = express;
const contenedor = require("../index.js");


const router = Router();



// Rutas raiz de producto.
router.get("/", async (req, res) => {
    res.status(200).json(await contenedor.getAll());
})



// Ruta para obtener producto por id.
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const productoEncontrado = await contenedor.getById(parseInt(id));

    productoEncontrado ? res.status(200).json(productoEncontrado) : res.status(400).json({error: `El producto con ID:${id} no se encontró`});
    
})



// Ruta para guardar un producto.
router.post("/", async (req, res) => {
    
    const productoParaGuardar = req.body;

    const idProductoGuardado = await contenedor.save({...productoParaGuardar});

    res.status(200).json(`Producto Guardado. ID: ${idProductoGuardado}`);

})



// Ruta para actualizar un producto ya existente.
router.put("/:id", async (req, res) => {
    const {name, price} = req.body;
    const { id } = req.params;

    await contenedor.update(id, name, price);

    res.status(200).json("put hecho");
    
})



// Ruta para eliminar un producto por su id.
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    const productoEncontrado = await contenedor.getById(parseInt(id));
    
    if(!productoEncontrado){
        res.status(400).json(`El producto con ID: ${id} no se encontrò`);

    }else{
        await contenedor.deleteById(parseInt(id));

        res.status(200).json(`Archivo eliminado con exito`);
    }
    
})


module.exports = router;