const config = {
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

module.exports = config;