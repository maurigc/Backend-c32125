import MongoStore from "connect-mongo";
// import { SchemaGraphql } from "./models/productos.schema.graphql.js";
// import { getProducto } from './routes/productos.graphql.js'
import dotenv from "dotenv";

dotenv.config();

const config = {
    mongoDb: {
        url: process.env.URL_MONGO_LOCAL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    mysql: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "ecommerce"
        }
    },
    sqlite: {
        client: "sqlite3",
        connection: {
            filename: "../database/mydb.sqlite"
        },
        useNullAsDefault: true
    },
    session: {
        secret: process.env.SECRET_WORD,
        store: MongoStore.create({
            mongoUrl: process.env.URL_MONGO_ATLAS,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        cookie: {
            maxAge: 60000 * 10
        },
        resave: true,
        saveUninitialized: true
    },
    // graphql: {
    //     schema: SchemaGraphql,
    //     rootValue:{
    //         getProducto
    //     },
    //     graphiql: true
    // }
}

export { config };