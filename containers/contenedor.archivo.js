import fs from "fs";


class ContenedorArchivo {
    constructor(ruta){
        this.ruta = ruta;
    }

    // Funcion que retorna el archivo de texto parseado.
    leerArchivo = async () => {
        const content = await fs.promises.readFile(this.ruta, "utf-8");

        return await JSON.parse(content);
    }

   
    //_________________________________________________________________________________________________________________
    // Metodo para guardar un item.
    async save(item){
        try {
            const contenidoArchivo = await this.leerArchivo();    
            
            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoArchivo, {_id: contenidoArchivo.length + 1, ...item}], null, 2), "utf-8")
             
            return contenidoArchivo.length + 1;
        
        } catch (error) {
            console.log(error)
        }
        
    }


    //_________________________________________________________________________________________________________________
    // Metodo para obtener todos los items del archivo.
    async getAll(){
        try {
            const contenidoArchivo = await this.leerArchivo();

            return contenidoArchivo;

        } catch (error) {
            console.log(error)
        }
        
    }


    //_________________________________________________________________________________________________________________
    // Metodo para obtener un item por su id.
    async getById(idItem){
        const contenidoArchivo = await this.leerArchivo();

        let itemBuscado = contenidoArchivo.find(e => e._id === idItem); //Buscamos el producto con el mismo id.

        return itemBuscado;
    }


    

    //_________________________________________________________________________________________________________________
    // Metodo para eliminar un item por su id.
    async deleteById(idItem){
        try {
            const contenidoArchivo = await this.leerArchivo();

            const itemsNoEliminados = contenidoArchivo.filter( e => e.id !== idItem); //filtramos los items con el id diferente al hardcodeado.

            await fs.promises.writeFile(this.ruta, JSON.stringify([...itemsNoEliminados], null, 2), "utf-8");

        } catch (error) {
            console.log(error)
        }
    }


    //_________________________________________________________________________________________________________________
    // Metodo para eliminar todos los items.
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta,"[]", "utf-8");
            
        } catch (error) {
            console.log(error);
        }


    }

}


export default ContenedorArchivo;