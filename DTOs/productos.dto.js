class ProductoDto{
    constructor(producto){
        this._id = producto._id,
        this.name = producto.name,
        this.price = producto.price,
        this.urlImage = producto.urlImage
    }
}


export default ProductoDto;


