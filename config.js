import dotenv from "dotenv";
dotenv.config();

const config = {
    mongoDb: {
        url: process.env.URL_MONGO_ATLAS,
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
    }
}

export { config };