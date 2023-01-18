import { contenedorUno } from "../containers/index.contenedor.js";
import Contenedor from "../containers/contenedorSQL.js";
import { config } from "../config.js";

const contenedorProductos = new Contenedor(config.mysql, "productos");

const obtenerUser = (usuario) => {
    return usuario;
}

const buscarProductoPorId = async(idProducto) => {
    return await contenedorUno.getProductById(parseInt(idProducto));
}


const guardarProducto = async(producto) => {
    await contenedorUno.saveProduct({...producto});
}


const actualizarProducto = async(id, nuevoAtributo) => {
    await contenedorUno.updateProduct(id, nuevoAtributo.name, nuevoAtributo.price);
}

const eliminarProducto = async(id) => {
    await contenedorUno.deleteProductById(id);
}


const guardarYActualizar = async(data) => {
    await contenedorProductos.save(data);

    return await contenedorProductos.getAll();
}

export { obtenerUser, buscarProductoPorId, guardarProducto, actualizarProducto, eliminarProducto, guardarYActualizar };