import express from "express";
// *********************import Rutas***************************
import { router as productos } from "./routes/productos.routes.js";
import { router as usuario } from "./routes/usuario.routes.js";
import { router as fail } from "./routes/fail.routes.js";
import { router as test } from "./routes/test.routes.js";
// *********************import Session*************************
import session from "express-session";
import MongoStore from "connect-mongo";
// *********************import Gzip*************************
import compression from "compression";
// ************************************************************
import { config } from "./config.js";
import dotenv from "dotenv";
import { passport } from "./middlewares/passport.js";


dotenv.config()

const app = express();



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
app.use(compression());


//_________________________________________________________________________________________________________________________
// Configuracion de motor de plantilla "Ejs"
app.set("views", "./public/views");
app.set("view engine", "ejs");



//_________________________________________________________________________________________________________________________
// Ruta de productos
app.use("/api", productos);
app.use("/api/auth", usuario);
app.use("/api/fail", fail)
app.use("/api/test", test)





export { app };