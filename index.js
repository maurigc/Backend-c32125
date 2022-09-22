// Clase contenedora
class Contenedor {
    constructor(array){
        this.array = array;
    }

    update(idProducto, nombre, precio){
        try {
            
            const productoBuscado = this.array.find(e => e.id === idProducto); //Buscamos el producto con el mismo id. 

            productoBuscado.name = nombre;
            productoBuscado.price = precio;
            
        } catch (error) {
            console.log(error);
        }
    }

    // Metodo para actualizar un producto.
    save(producto){
        try {

            this.array.length === 0 ? this.array.push({...producto, id: 1}) : this.array.push({...producto, id: this.array.length + 1});;
            

            return this.array.length;

        } catch (error) {
            console.log(error);
        }
    }


    // Metodo para obtener un producto por su id.
    getById(idProducto){

        let productoBuscado = this.array.find(e => e.id === idProducto); //Buscamos el producto con el mismo id.

        if(productoBuscado === undefined){ //si no se encuentra ningun producto pasa a ser nulo.
            productoBuscado = null;
        }

        return productoBuscado;
    }


    // Metodo para obtener todos los productos del archivo.
    getAll(){
        try {
            return this.array;

        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para eliminar un producto por su id.
    deleteById(idProducto){
        try {
            const contenidoNoEliminado = this.array.filter( e => e.id !== idProducto); //filtramos los productos con el id diferente al hardcodeado.

            this.array = []; //Borramos todo el contenido del array.

            this.array.push(...contenidoNoEliminado); //Hacemo un push con el contenido sin el producto que eliminamos.


        } catch (error) {
            console.log(error)
        }
    }


    // Metodo para eliminar todos los productos.
    deleteAll(){
        try {
            this.array = [];
    
        } catch (error) {
            console.log(error);
        }


    }
}


const contenedorUno = new Contenedor([]);


module.exports = contenedorUno;