import ContenedorArchivo from "../../containers/contenedor.archivo.js";



class MensajesDaoArchivo extends ContenedorArchivo{
    constructor(){
        super("./mensajes.txt");
    }
}



export default MensajesDaoArchivo;