import { Schema } from "mongoose";

const usuarioSchema = new Schema ({
    _id: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export { usuarioSchema };