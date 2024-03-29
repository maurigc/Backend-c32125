import express from "express";
// *********************import Rutas***************************
import { router as productos } from "./routes/productos.routes.js";
import { router as usuario } from "./routes/usuario.routes.js";
import { router as fail } from "./routes/fail.routes.js";
import { router as test } from "./routes/test.routes.js";
// *********************import Session*************************
import session from "express-session";

// *********************import Gzip*************************
import compression from "compression";
// ************************************************************
import { config } from "./config.js";
import dotenv from "dotenv";
import { passport } from "./middlewares/passport.js";

// ************************** graphql **********************************
import { graphqlHTTP } from "express-graphql";


import { SchemaGraphql } from "./models/productos.schema.graphql.js";
import { getProducto, getProductos, saveProducto, deleteProducto } from './routes/productos.graphql.js';

dotenv.config()

const app = express();



//_________________________________________________________________________________________________________________________
// Middlewares
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("./public"));
app.use(session(config.session))
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());


//_________________________________________________________________________________________________________________________
// Configuracion de motor de plantilla "Ejs"
app.set("views", "./public/views");
app.set("view engine", "ejs");



//_________________________________________________________________________________________________________________________
// Rutas
app.use("/api", productos);
app.use('/productos-graphql', graphqlHTTP({
        schema: SchemaGraphql,
        rootValue:{
            getProducto,
            getProductos,
            saveProducto,
            deleteProducto
        },
        graphiql: true
    }));
app.use("/api/auth", usuario);
app.use("/api/fail", fail)
app.use("/api/test", test)





export { app };