let mensajesDao
let usuariosDao
let productosDao

switch ("archivo") {
    case 'sql':
        const { default : mensajesDAOsql} = await import("../DAOs/daoSQL/mensajes.dao.sql.js");    
        const { default : usuariosDAOsql } = await import("../DAOs/daoSQL/usuarios.dao.sql.js");
        const { default : productosDAOsql } = await import("../DAOs/daoSQL/productos.dao.sql.js");

        mensajesDao = new mensajesDAOsql();
        usuariosDao = new usuariosDAOsql();
        productosDao = new productosDAOsql();

        break
    case 'archivo':
        const { default : mensajesDAOarchivo } = await import("../DAOs/daoArchivo/mensajes.dao.archivo.js");    
        const { default : usuariosDAOarchivo } = await import("../DAOs/daoArchivo/usuario.dao.archivo.js");
        const { default : productosDAOarchivo } = await import("../DAOs/daoArchivo/productos.dao.archivo.js");

        mensajesDao = new mensajesDAOarchivo();
        usuariosDao = new usuariosDAOarchivo(); 
        productosDao = new productosDAOarchivo();  
        
        break
    case 'mongodb':
        const {default : mensajesDaoMongo} = await import("../DAOs/daoMongoDb/mensajes.dao.mongodb.js");    
        const {default : usuariosDaoMongo} = await import("../DAOs/daoMongoDb/usuarios.dao.mongodb.js");
        const {default : productosDaoMongo} = await import("../DAOs/daoMongoDb/productos.dao.mongodb.js");

        mensajesDao = new mensajesDaoMongo();
        usuariosDao = new usuariosDaoMongo();
        productosDao = new productosDaoMongo();

        break
    
}

export { usuariosDao, mensajesDao, productosDao };