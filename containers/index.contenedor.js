// const fs = require("fs");
import fs from "fs";

// ////////////////////Clase contenedora para productos////////////////////
class Contenedor {
    constructor(array){
        this.array = array;
    }

    updateProduct(idProducto, nombre, precio){
        try {
            
            const productoBuscado = this.array.find(e => e.id === idProducto); //Buscamos el producto con el mismo id. 

            productoBuscado.name = nombre;
            productoBuscado.price = precio;
            
        } catch (error) {
            console.log(error);
        }
    }

    // Metodo para actualizar un producto.
    saveProduct(producto){
        try {

            this.array.length === 0 ? this.array.push({...producto, id: 1}) : this.array.push({...producto, id: this.array.length + 1});;
            

            return this.array.length;

        } catch (error) {
            console.log(error);
        }
    }


    // Metodo para obtener un producto por su id.
    getProductById(idProducto){

        let productoBuscado = this.array.find(e => e.id === idProducto); //Buscamos el producto con el mismo id.

        if(productoBuscado === undefined){ //si no se encuentra ningun producto pasa a ser nulo.
            productoBuscado = null;
        }

        return productoBuscado;
    }


    // Metodo para obtener todos los productos del archivo.
    getAllProduct(){
        try {
            return this.array;

        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para eliminar un producto por su id.
    deleteProductById(idProducto){
        try {
            const contenidoNoEliminado = this.array.filter( e => e.id !== idProducto); //filtramos los productos con el id diferente al hardcodeado.

            this.array = []; //Borramos todo el contenido del array.

            this.array.push(...contenidoNoEliminado); //Hacemo un push con el contenido sin el producto que eliminamos.


        } catch (error) {
            console.log(error)
        }
    }


    // Metodo para eliminar todos los productos.
    deleteAllProduct(){
        try {
            this.array = [];
    
        } catch (error) {
            console.log(error);
        }


    }
}


// ////////////////////Clase contenedora para Mensajes////////////////////


// Clase contenedora
class ContenedorMensajes {
    constructor(ruta){
        this.ruta = ruta;
    }

    // Funcion que retorna el archivo de texto parseado.
    leerArchivo = async () => {
        const content = await fs.promises.readFile(this.ruta, "utf-8");

        return await JSON.parse(content);
    }

   

    // Metodo para guardar un producto
    async save(mensaje){
        try {
            const contenidoParseado = await this.leerArchivo();    
            
            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado, {...mensaje}], null, 2), "utf-8")
             
            return contenidoParseado.length + 1;
        
        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para obtener un producto por su id.
    async getById(idProducto){
        const contenidoParseado = await this.leerArchivo();

        let productoBuscado = contenidoParseado.find(e => e.id === idProducto); //Buscamos el producto con el mismo id.

        if(productoBuscado === undefined){ //si no se encuentra ningun producto pasa a ser nulo.
            productoBuscado = null;
        }

        return productoBuscado;
    }


    // Metodo para obtener todos los productos del archivo.
    async getAll(){
        try {
            const contenidoParseado = await this.leerArchivo();

            return contenidoParseado;

        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para eliminar un producto por su id.
    async deleteById(idProducto){
        try {
            const contenidoParseado = await this.leerArchivo();

            const contenidoNoEliminado = contenidoParseado.filter( e => e.id !== idProducto); //filtramos los productos con el id diferente al hardcodeado.

            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoNoEliminado], null, 2), "utf-8");

        } catch (error) {
            console.log(error)
        }
    }


    // Metodo para eliminar todos los productos.
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta,"[]", "utf-8");
            console.log("listo")
        } catch (error) {
            console.log(error);
        }


    }
}



const contenedorUno = new Contenedor([]);

export { contenedorUno };
