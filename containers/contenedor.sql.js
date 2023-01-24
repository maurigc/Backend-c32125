import knex from "knex";

class ContenedorSQL{
    constructor(config, nombreTabla){
        this.knex = knex(config),
        this.nombreTabla = nombreTabla
    }

    //_________________________________________________________________________________________________________________
    // Metodo para guardar un item.
    async save(item){
        try {
            await this.knex(this.nombreTabla).insert(item);

            console.log("Guardado con éxito.");

        } catch (error) {
            console.log(error);

        }
    }


    //_________________________________________________________________________________________________________________
    // Metodo para obtener todos los items.
    async getAll(){
        try {
            const items = await this.knex.from(this.nombreTabla).select("*")

            if(items[0].author){
                items.forEach(item => {
                    item.author = JSON.parse(item.author)
                })
            }

            return items;

        } catch (error) {
            console.log(error);
            
        } 
    }


    //_________________________________________________________________________________________________________________
    // Metodo para obtener un item por su id.
    async getById(idItem){
        try {
            const itemEncontrado = await this.knex.from(this.nombreTabla).select("*").where("_id", "=", idItem);

            return itemEncontrado;

        } catch (error) {
            console.log(error);

        } 
    }

    //_________________________________________________________________________________________________________________
    // Metodo para eliminar un item por su id.
    async deleteById(idItem){
        try {
            await this.knex(this.nombreTabla).where("_id", "=", idItem).del();

            console.log(`Objeto con ID:${idItem} eliminado con éxito.`);

        } catch (error) {
            console.log(error);

        }
    }

    //_________________________________________________________________________________________________________________
    // Metodo para eliminar todos los items.
    async deleteAll(){
        try {
            await this.knex(this.nombreTabla).del();

            console.log("Todos los objetos eliminados.");

        } catch (error) {
            console.log(error);

        }
    }
}


export default ContenedorSQL;