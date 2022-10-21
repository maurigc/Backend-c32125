const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productos = require("./modulos/productos.js");
const Contenedor = require("./contenedores/contenedorSQL.js");
const config = require("./config.js");



// Instanciado de conetenedor SQL
const contenedorProductos = new Contenedor(config.mysql, "productos");
const contenedorMensajes = new Contenedor(config.sqlite, "mensajes");


// Instanciado de servidor
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


// Middlewares
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static(__dirname + "/public"));


// Configuracion de motor de plantilla "Ejs"
app.set("views", "./public/views");
app.set("view engine", "ejs");


const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
})


// Socket
io.on("connection", async (socket) => {
    console.log("conectado");

    // EVENTOS PARA PRODUCTOS
    const todosProductos = await contenedorProductos.getAll();
    socket.emit("tabla", todosProductos);

    
    socket.on("nuevoProducto",async (data) => {
        await contenedorProductos.save(data);

        const productosActualizado = await contenedorProductos.getAll();

        io.sockets.emit("tabla", productosActualizado);
    })

    // EVENTOS PARA MENSAJES
    const todosMensajes = await contenedorMensajes.getAll();
    socket.emit("mensaje", todosMensajes);

    socket.on("nuevoMensaje", async (data) => {

        await contenedorMensajes.save(data);

        const arrayConMensajesNuevos = await contenedorMensajes.getAll();

        io.sockets.emit("mensaje", arrayConMensajesNuevos);
    }) 
    
    

})


// Ruta de productos
app.use("/api", productos);


