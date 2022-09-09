const fs = require("fs");


// Clase contenedora
class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    // Funcion que retorna el archivo de texto parseado.
    leerArchivo = async () => {
        const content = await fs.promises.readFile(this.ruta, "utf-8");

        return await JSON.parse(content);
    }

    // Metodo para guardar un producto
    async save(producto){
        try {
            const contenidoParseado = await this.leerArchivo();    
            
            contenidoParseado.length === 0 
                ? await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado, {...producto, id: 1}], null, 2), "utf-8")
             
                : await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado, {...producto, id: contenidoParseado.length + 1}], null, 2), "utf-8");
            
                return contenidoParseado.length + 1;
        
        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para obtener un producto por su id.
    async getById(idProducto){
        const contenidoParseado = await this.leerArchivo();

        let productoBuscado = contenidoParseado.filter(e => e.id === idProducto); //filtramos el producto con el mismo id hardcodeado.

        if(productoBuscado.length === 0){ //si no se encuentra ningun producto pasa a ser nulo.
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


const contenedorUno = new Contenedor("productos.txt");

// contenedorUno.save({name: "arroz", price: 150});



module.exports = contenedorUno;