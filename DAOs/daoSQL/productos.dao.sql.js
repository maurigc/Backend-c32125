import ContenedorSQL from "../../containers/contenedor.sql.js";
import { config } from "../../config.js";


class ProductosDaoSQL extends ContenedorSQL{
    constructor(){
        super(config.mysql, "productos")
    }
}


export default ProductosDaoSQL;