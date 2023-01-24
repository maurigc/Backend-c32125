class ContenedorMemoria {
    constructor(){
        this.array = [];
    }


    //_________________________________________________________________________________________________________________
    // Metodo para guardar un item.
    save(item){
        try {

            this.array.length === 0 ? this.array.push({...item, id: 1}) : this.array.push({...item, id: this.array.length + 1});;
            

            return this.array.length;

        } catch (error) {
            console.log(error);
        }
    }



    //_________________________________________________________________________________________________________________
    // Metodo para obtener todos los productos del archivo.
    getAll(){
        try {
            return this.array;

        } catch (error) {
            console.log(error)
        }
        
    }



    //_________________________________________________________________________________________________________________
    // Metodo para obtener un item por su id.
    getById(idItem){
        try {
            let itemBuscado = this.array.find(e => e.id === idItem); //Buscamos el item con el mismo id.
            
            return itemBuscado;

        } catch (error) {
            console.log(error);
        }

        return itemBuscado;
    }



    // Metodo para eliminar un producto por su id.
    deleteById(idItem){
        try {
            const itemsNoEliminados = this.array.filter( e => e.id !== idItem); //filtramos los items con el id diferente .

            this.array = []; //Borramos todo el contenido del array.

            this.array.push(...itemsNoEliminados); //Hacemos un push con el contenido sin el item que eliminamos.


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


export default ContenedorMemoria;