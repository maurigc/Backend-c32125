import mongoose from "mongoose";
import { config } from "../config.js";
import { mensajeSchema } from "../models/mensajes.model.js"

class ContenedorMongodb {
    constructor(coleccion, schema){
        this.connectDb();
        this.coleccion = mongoose.model(coleccion, schema);
    }

    connectDb = async() => {
        try {
            await mongoose.connect(config.mongoDb.url, config.mongoDb.options);

            console.log("Base de datos conectada.");
        } catch (error) {
            console.log(error);
        }
        
    }

    //_____________________________________________________________
    //Guardar un mensaje.
    async save(item) {
        try {
            const newItem = new this.coleccion(item)

            await newItem.save();
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener todos los mensajes.
    async getAll() {
        try {
            return await this.coleccion.find();
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener mensaje por su id.
    async getById(idItem) {
        try {
            return await this.coleccion.find({_id: {$eq: idItem}});
    
        } catch (error) {
            console.log(error);
        }
    }  
    //_____________________________________________________________
    //Eliminar mensaje por su id.
    async deleteById(idItem) {
        try {
            await this.coleccion.deleteOne({_id: {$eq: idItem}});
        } catch (error) {
            console.log(error);
        }
        
    }
}

// const contenedor = new ContenedorMongodb("mensajes", mensajeSchema)

// contenedor.save({
//     author: {
//         id: "jorge@mail.com",
//         nombre: "jorge",
//         apellido: "garcia",
//         edad: 65,
//         alias: "jorgito",
//         avatar: "https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person12-512.png"
//     },
//     text: "buenas tardes gente!"
// })

export default ContenedorMongodb;