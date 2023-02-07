import { buildSchema } from 'graphql';


const SchemaGraphql = buildSchema(`
    type Producto {
        _id: String,
        name: String,
        price: Int,
        urlImage: String
    }
    input inputProducto {
        name: String,
        price: Int,
        urlImage: String
    }
    type Query {
        getProducto(_id: String): Producto
        getProductos(campo: String, valor: String): [Producto]
    }
    type Mutation {
        saveProducto(producto: inputProducto): Producto
        deleteProducto(_id: String): Producto
    }    
    
`)

export { SchemaGraphql };