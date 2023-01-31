let mensajesDao
let usuariosDao
let productosDao

switch ("mongodb") {
    case 'sql':
        const { default : mensajesDAOsql} = await import("./daoSQL/mensajes.dao.sql.js");    
        const { default : usuariosDAOsql } = await import("./daoSQL/usuarios.dao.sql.js");
        const { default : productosDAOsql } = await import("./daoSQL/productos.dao.sql.js");

        mensajesDao = new mensajesDAOsql();
        usuariosDao = new usuariosDAOsql();
        productosDao = new productosDAOsql();

        break
    case 'archivo':
        const { default : mensajesDAOarchivo } = await import("./daoArchivo/mensajes.dao.archivo.js");    
        const { default : usuariosDAOarchivo } = await import("./daoArchivo/usuario.dao.archivo.js");
        const { default : productosDAOarchivo } = await import("./daoArchivo/productos.dao.archivo.js");

        mensajesDao = new mensajesDAOarchivo();
        usuariosDao = new usuariosDAOarchivo(); 
        productosDao = new productosDAOarchivo();  
        
        break
    case 'mongodb':
        const {default : mensajesDaoMongo} = await import("./daoMongoDb/mensajes.dao.mongodb.js");    
        const {default : usuariosDaoMongo} = await import("./daoMongoDb/usuarios.dao.mongodb.js");
        const {default : productosDaoMongo} = await import("./daoMongoDb/productos.dao.mongodb.js");

        mensajesDao = new mensajesDaoMongo();
        usuariosDao = new usuariosDaoMongo();
        productosDao = new productosDaoMongo();

        break
    
}

export { usuariosDao, mensajesDao, productosDao };