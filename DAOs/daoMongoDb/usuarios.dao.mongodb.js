import ContenedorMongodb from "../../containers/contenedor.mongodb.js";
import { usuarioSchema } from "../../models/usuarios.model.js";

class UsuariosDaoMongo extends ContenedorMongodb{
    constructor(){
        super("usuarios", usuarioSchema)
    }
}


export default UsuariosDaoMongo;