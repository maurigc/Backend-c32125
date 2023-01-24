import ContenedorArchivo from "../../containers/contenedor.archivo.js";



class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super("./productos.txt");
    }
}



export default ProductosDaoArchivo;