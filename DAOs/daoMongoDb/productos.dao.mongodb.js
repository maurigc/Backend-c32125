import ContenedorMongodb from "../../containers/contenedor.mongodb.js";
import { productoSchema } from "../../models/productos.model.js";



class ProductosDaoMongo extends ContenedorMongodb{
    constructor(){
        super("productos", productoSchema)
    }
}



export default ProductosDaoMongo;