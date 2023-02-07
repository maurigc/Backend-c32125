import RepositorioProducto from "../repository/productos.repository.js"
const repoProducto = new RepositorioProducto();

const getProducto = async ({ _id }) => {
    try {
        const producto = await repoProducto.getById(_id);
        
        if(!producto){
            throw new Error('El producto no existe');
        }

        return producto;
        
    } catch (error) {
        console.log(error);
    }
    
}


const getProductos = async({campo, valor}) => {
    try {
        const productos = await repoProducto.getAll();

        if(campo && valor){
            return productos.filter(p => p[campo] == valor);
        }else{
            return productos;

        }

    } catch (error) {
        console.log(error);
    }
}


const saveProducto = async({ producto }) => {
    try {
        const productoGuardado = await repoProducto.save(producto);

        return productoGuardado;
    } catch (error) {
        console.log(error);
    }
}


const deleteProducto = async({ _id }) => {
    try {
        const productoAEliminar = await repoProducto.getById(_id);

        await repoProducto.deleteById(_id);

        return productoAEliminar;
    } catch (error) {
        console.log(error);
    }
}


export { getProducto, getProductos, saveProducto, deleteProducto };