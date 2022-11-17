import express from "express";
import { Server as HTTPServer } from "http";
import { Server as IOServer} from "socket.io";
import { router as productos } from "./routes/productos.routes.js";
import { router as usuario } from "./routes/usuario.routes.js";
import { normalizarMensajes } from "./scripts/normalizarMensajes.js";
import { generarProductos } from "./scripts/crearProductos.js";
import ContenedorMongodb from "./containers/contenedor.mongodb.js";
import { mensajeSchema } from "./models/mensajes.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";

import { config } from "./config.js";
import Contenedor from "./containers/contenedorSQL.js";



// Instanciado de conetenedor SQL
const contenedorProductos = new Contenedor(config.mysql, "productos");
const contenedorMensajes = new ContenedorMongodb("mensajes", mensajeSchema);


// Instanciado de servidor
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


// Middlewares
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("./public"));
app.use(session({
    secret: "mauricio",
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mauricio:mg37617746@cluster0.46j6cjs.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: config.mongoDb.options
    }),
    cookie: {
        maxAge: 60000 * 10
    },
    resave: true,
    saveUninitialized: true
}))

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
    // const todosProductos = await contenedorProductos.getAll();
    const todosProductos = generarProductos(5);
    socket.emit("tabla", todosProductos);

    
    socket.on("nuevoProducto",async (data) => {
        await contenedorProductos.save(data);

        const productosActualizado = await contenedorProductos.getAll();

        io.sockets.emit("tabla", productosActualizado);
    })

    // EVENTOS PARA MENSAJES
    const todosMensajes = await contenedorMensajes.getAll();
    
    const mensajesNormalizados = normalizarMensajes({id: "mensajes", todosMensajes});
    
    socket.emit("mensaje", mensajesNormalizados);

    socket.on("nuevoMensaje", async (data) => {

        await contenedorMensajes.save(data);

        const arrayConMensajesNuevos = await contenedorMensajes.getAll();
        
        const mensajesNormalizados = normalizarMensajes({id: "mensajes", arrayConMensajesNuevos});
       
        io.sockets.emit("mensaje", mensajesNormalizados);
    }) 
    
    

})


// Ruta de productos
app.use("/api", productos);
app.use("/api/auth", usuario);

