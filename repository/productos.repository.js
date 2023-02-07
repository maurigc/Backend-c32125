import { productosDao } from "../DAOs/factory.js";
import ProductoDto from "../DTOs/productos.dto.js";



class RepositorioProducto{
    constructor(){
    }


    async getAll(){
        const productos = await productosDao.getAll();

        const productosDto = productos.map( producto => {
            return new ProductoDto(producto)
        })
        
        return productosDto
        
    }

    async getById(idProducto){
        const productoEncontrado = await productosDao.getById(idProducto);
        
        return new ProductoDto(...productoEncontrado);
    }


    async save(producto){
        const productoDto = new ProductoDto(producto);

        await productosDao.save(productoDto);

        return productoDto;
    }

    async deleteById(idProducto){
        await productosDao.deleteById(idProducto);
    }
}


export default RepositorioProducto;