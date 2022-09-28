const express = require("express");
const app = express();
const productos = require("./modulos/productos.js");

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.set("views", ("public/views"));
app.set("view engine", "pug");

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
})

server.on("error", error => console.log(error));

app.use(express.static(__dirname + "/public"))

// Ruta de productos
app.use("/api", productos);

