import ContenedorSQL from "../../containers/contenedor.sql.js";
import { config } from "../../config.js";


class UsuariosDaoSQL extends ContenedorSQL{
    constructor(){
        super(config.mysql, "usuarios")
    }
}


export default UsuariosDaoSQL;