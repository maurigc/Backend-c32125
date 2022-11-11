// const knex = require("knex");
import knex from "knex";

class Contenedor{
    constructor(config, nombreTabla){
        this.knex = knex(config),
        this.nombreTabla = nombreTabla
    }


    async getAll(){
        try {
            const productos = await this.knex.from(this.nombreTabla).select("*")
            
            return productos;

        } catch (error) {
            console.log(error);
            
        } 
    }

    async getById(idObjeto){
        try {
            const productoEncontrado = await this.knex.from(this.nombreTabla).select("*").where("id", "=", parseInt(idObjeto));

            return productoEncontrado;

        } catch (error) {
            console.log(error);

        } 
    }

    async save(objeto){
        try {
            await this.knex(this.nombreTabla).insert(objeto);

            console.log("Guardado con éxito.");

        } catch (error) {
            console.log(error);

        }
    }

    async update(idObjeto, objeto){
        try {
            await this.knex(this.nombreTabla).where("id", "=", parseInt(idObjeto)).update({
                name: objeto.name,
                price: objeto.price,
                url: objeto.url
            })

            console.log("Actualizado con éxito.");

        } catch (error) {
            console.log(error);

        }
    }

    async deleteById(idObjeto){
        try {
            await this.knex(this.nombreTabla).where("id", "=", parseInt(idObjeto)).del();

            console.log(`Objeto con ID:${idObjeto} eliminado con éxito.`);

        } catch (error) {
            console.log(error);

        }
    }

    async deleteAll(){
        try {
            await this.knex(this.nombreTabla).del();

            console.log("Todos los objetos eliminados.");

        } catch (error) {
            console.log(error);

        }
    }
}


export default Contenedor;


