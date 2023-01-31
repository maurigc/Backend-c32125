import mongoose from "mongoose";
import { config } from "../config.js";
import { logError, logConsola } from "../scripts/logger.js";

class ContenedorMongodb {
    constructor(coleccion, schema){
        this.connectDb();
        this.coleccion = mongoose.model(coleccion, schema);
    }

    connectDb = async() => {
        try {
            await mongoose.connect(config.mongoDb.url, config.mongoDb.options);

            logConsola.info("Base de datos conectada.");
        } catch (error) {
            logError.error(error);
        }
        
    }

    //_____________________________________________________________
    //Guardar un mensaje.
    async save(item) {
        try {
            const newItem = new this.coleccion(item)

            await newItem.save();
        } catch (error) {
            logError.error(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener todos los mensajes.
    async getAll() {
        try {
            return await this.coleccion.find();
        } catch (error) {
            logError.error(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener mensaje por su id.
    async getById(idItem) {
        try {
            return await this.coleccion.find({_id: {$eq: idItem}});
    
        } catch (error) {
            logError.error(error);
        }
    }  
    //_____________________________________________________________
    //Eliminar mensaje por su id.
    async deleteById(idItem) {
        try {
            const itemAEliminar = await this.coleccion.find({_id: {$eq: idItem}})
            if(itemAEliminar === []){
                console.log(itemAEliminar)
                throw new Error('no existe el producto')
            }
            
            await this.coleccion.deleteOne({_id: {$eq: idItem}});
        } catch (error) {
            logError.error(error);
        }
        
    }
}


export default ContenedorMongodb;