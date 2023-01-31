import RepositorioProducto from "../repository/productos.repository.js";


const repoProducto = new RepositorioProducto();

const obtenerUser = (usuario) => {
    return usuario;
}

const todosProductos = async() => {
    return await repoProducto.getAll();
}

const buscarProductoPorId = async(idProducto) => {
    return await repoProducto.getById(idProducto);
}


const guardarProducto = async(producto) => {
    await repoProducto.save(producto)
}


const eliminarProducto = async(idProducto) => {
    await repoProducto.deleteById(idProducto)
}


const guardarYActualizar = async(data) => {
    await repoProducto.save(data)

    return await repoProducto.getAll();
}

export { obtenerUser, buscarProductoPorId, guardarProducto, eliminarProducto, guardarYActualizar, todosProductos };