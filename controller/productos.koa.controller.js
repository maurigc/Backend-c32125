import { buscarProductoPorId, guardarProducto, eliminarProducto,  todosProductos } from "../service/productos.service.js";

// ________________________________________________________________________________________
// obtener productos.
const getProductos = async ctx => {
    try {
        const productos = await todosProductos();

        ctx.body = productos;
    } catch (error) {
        console.log(error);
    }
}

// ________________________________________________________________________________________
// obtener producto por id.
const getProductoById =  async ctx => {
    try {
        const producto = await buscarProductoPorId(ctx.params.id)

        ctx.body = {
            msg: 'productos encontrado',
            producto
        }
    } catch (error) {
        console.log(error);
    }
}


// ________________________________________________________________________________________
// guardar un producto.
const saveProducto = async ctx => {
    try {
        const producto = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            urlImage: ctx.request.body.urlImage
        }
        
        await guardarProducto(producto);

        ctx.body = {
            msg: 'producto guardado con éxito',
            producto
        }
        
    } catch (error) {
        console.log(error);
    }
}

// ________________________________________________________________________________________
// eliminar un producto.
const deleteProducto = async ctx => {
    try {
        const producto = await buscarProductoPorId(ctx.params.id)
        
        await eliminarProducto(ctx.params.id);

        ctx.body = {
            msg: 'producto eliminado',
            producto
        }
    } catch (error) {
        console.log(error);
    }
}



export { getProductos, getProductoById, saveProducto, deleteProducto };