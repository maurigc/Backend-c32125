import { Schema } from "mongoose";

const mensajeSchema = new Schema ({
    author: {
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            max: 100
        },
        alias: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    
    },
    text: {
        type: String
    }
})

export { mensajeSchema };