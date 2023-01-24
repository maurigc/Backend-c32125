import { Schema } from "mongoose";

const productoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    urlImage: {
        type: String,
        required: true
    }
})


export { productoSchema };