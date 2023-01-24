import ContenedorArchivo from "../../containers/contenedor.archivo.js";



class UsuarioDaoArchivo extends ContenedorArchivo{
    constructor(){
        super("./usuarios.txt");
    }
}




export default UsuarioDaoArchivo;