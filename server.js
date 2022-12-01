import express from "express";
import { Server as HTTPServer } from "http";
import { Server as IOServer} from "socket.io";
// ____________________________________________________________
// *********************import Rutas***************************
import { router as productos } from "./routes/productos.routes.js";
import { router as usuario } from "./routes/usuario.routes.js";
import { router as fail } from "./routes/fail.routes.js";
import { router as test } from "./routes/test.routes.js";
// ____________________________________________________________
// *********************import Scripts*************************
import { normalizarMensajes } from "./scripts/normalizarMensajes.js";
import { generarProductos } from "./scripts/crearProductos.js";
// ____________________________________________________________
// *********************import Contenedores********************
import MensajesDao from "./DAOs/mensajes.dao.js";
import Contenedor from "./containers/contenedorSQL.js";
import { config } from "./config.js";
// ____________________________________________________________
// *********************import Session*************************
import session from "express-session";
import MongoStore from "connect-mongo";
// ____________________________________________________________
// *********************import Minimist************************
import minimist from "minimist";
const args = minimist(process.argv.slice(2));

import { passport } from "./middlewares/passport.js";
import dotenv from "dotenv"


dotenv.config()
//_________________________________________________________________________________________________________________________
// Instanciado de conetenedor SQL
const contenedorProductos = new Contenedor(config.mysql, "productos");
const contenedorMensajes = new MensajesDao();
//_________________________________________________________________________________________________________________________
// Instanciado de servidor
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

//_________________________________________________________________________________________________________________________
// Middlewares
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("./public"));
app.use(session({
    secret: process.env.SECRET_WORD,
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO_ATLAS,
        mongoOptions: config.mongoDb.options
    }),
    cookie: {
        maxAge: 60000 * 10
    },
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//_________________________________________________________________________________________________________________________
// Configuracion de motor de plantilla "Ejs"
app.set("views", "./public/views");
app.set("view engine", "ejs");


const PORT = args.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
})
//_________________________________________________________________________________________________________________________
// Ruta de productos
app.use("/api", productos);
app.use("/api/auth", usuario);
app.use("/api/fail", fail)
app.use("/api/test", test)



//_________________________________________________________________________________________________________________________
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


