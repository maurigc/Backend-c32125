import RepositorioProducto from "../repository/productos.repository.js";
import { obtenerUser, buscarProductoPorId, guardarProducto, eliminarProducto, guardarYActualizar, todosProductos } from '../service/productos.service.js'
import assert from 'assert';



describe("Test para el manejo de productos", () => {

    before(() => {
        console.log('//-------------------- Comienzo del test --------------------//');
    })


    after(() => {
        console.log('//-------------------- Fin del test ------------------------//');
    })

    
    it('Corrobora que exista la DB de productos', async() => {
        const productos = await todosProductos();
        assert.strictEqual(Array.isArray(productos), true)
    })

    it('Debe agregar un producto a la DB', async() => {
        const producto = {
            name: "fideo",
            price: 300,
            urlImage: "https://cdn4.iconfinder.com/data/icons/fruits-79/48/07-raspberry-512.png"
        }

        await guardarProducto(producto);
        const productos = await todosProductos();

        assert.strictEqual(productos.length >= 0, true );
        assert.deepStrictEqual(producto, {
            name: "fideo",
            price: 300,
            urlImage: "https://cdn4.iconfinder.com/data/icons/fruits-79/48/07-raspberry-512.png"
        })
    })

    it('Debe eliminar un producto.', async() => {
        const productosCompleto = await todosProductos();
        
        await eliminarProducto("63d96450d01edeef8066a47e");
        
        const productos = await todosProductos();
        
        assert.strictEqual(productos.length < productosCompleto.length, true);
    })

})



