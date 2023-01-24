import ContenedorSQL from "../../containers/contenedor.sql.js";
import { config } from "../../config.js";


class MensajesDaoSQL extends ContenedorSQL{
    constructor(){
        super(config.mysql, "mensajes")
    }
}


export default MensajesDaoSQL;