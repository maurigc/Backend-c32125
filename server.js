const express = require("express");
const app = express();
const contenedor = require("./index.js")


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
})

server.on("error", error => console.log(error));



// Ruta de productos
app.get("/productos", async (req, res) => {
    const todosProductos = await contenedor.getAll();
    res.send(todosProductos);
})



// Ruta de producto random
app.get("/productoRandom", async (req, res) => {
    let numeroRandom = Math.random() * 3;
    const productoRandom = await contenedor.getById(Math.ceil(numeroRandom));
    res.send(productoRandom);
})