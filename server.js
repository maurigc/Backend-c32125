const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const productos = require("./modulos/productos.js");

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static(__dirname + "/public"));


app.engine("hbs", hbs.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/public/views/partials",
    layoutsDir: __dirname + "/public/views/layouts",
    defaultLayout: "ingresarProductos.hbs"
}))

app.set("views", "./public/views");
app.set("view engine", "hbs");



const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
})

server.on("error", error => console.log(error));




// Ruta de productos
app.use("/api", productos);

