const config = {
    mongoDb: {
        url: "mongodb://localhost:27017/backend-32125",
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