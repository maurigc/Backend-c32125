import ContenedorMongodb from "../../containers/contenedor.mongodb.js";
import { mensajeSchema } from "../../models/mensajes.model.js";


class MensajesDaoMongo extends ContenedorMongodb{
    constructor(){
        super("mensajes", mensajeSchema);
    }
}



export default MensajesDaoMongo;