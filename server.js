const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productos = require("./modulos/productos.js");
const { contenedorMensaje, contenedorUno } = require("./index.js");
const { default: async } = require("neo-async");

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


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
    const todosProductos = contenedorUno.getAllProduct();
    socket.emit("tabla", todosProductos);

    socket.on("nuevoProducto",async (data) => {
        await contenedorUno.saveProduct(data);

        const productosActualizado = await contenedorUno.getAllProduct();

        io.sockets.emit("tabla", productosActualizado);
    })

    // EVENTOS PARA MENSAJES
    const todosMensajes = await contenedorMensaje.getAll();
    socket.emit("mensaje", todosMensajes);

    socket.on("nuevoMensaje", async (data) => {
    
        await contenedorMensaje.save(data);

        const arrayConMensajesNuevos = await contenedorMensaje.getAll();

        io.sockets.emit("mensaje", arrayConMensajesNuevos);
    }) 

})


// Ruta de productos
app.use("/api", productos);


