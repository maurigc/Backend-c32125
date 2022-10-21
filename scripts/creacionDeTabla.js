const config = require("../config.js");
const knex = require("knex");


const crearTablaMariaDB = async (knex) => {
    try {

        await knex.schema.createTable("productos", ( table ) => {
            table.increments("id")
            table.string("name")
            table.integer("price")
            table.string("url")
        })
    
        console.log("tabla creada correctamente.");
    
    } catch (error) {
        console.log(`${error}:Error al construir la tabla.`);
    
    } finally{ 
        knex.destroy();
    }
}

const crearTablaSqlite = async (knex) => {
    try {

        await knex.schema.createTable("mensajes", ( table ) => {
            table.string("mail")
            table.string("texto")
            table.string("fecha")
        })
    
        console.log("tabla creada correctamente.");
    
    } catch (error) {
        console.log(`${error}:Error al construir la tabla.`);
    
    } finally{ 
        knex.destroy();
    } 
}

crearTablaMariaDB(knex(config.mysql));
crearTablaSqlite(knex(config.sqlite));


