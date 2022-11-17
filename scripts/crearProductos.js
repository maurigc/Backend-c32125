import { faker } from "@faker-js/faker";
const { commerce, image } = faker;

faker.locale = "es";

// Funcion para generar productos random utilizando faker.
const generarProductos = (cantidad) => {
    
    const productosGenerados = [];
    
    for (let i = 0; i < cantidad; i++) {
        productosGenerados.push({
            id: productosGenerados.length === 0 ? 1 : productosGenerados.length + 1,
            name: commerce.product(),
            price: `$ ${commerce.price()}`,
            url: image.image()
        }) 
        
    }

    return productosGenerados;
    
    
}

export { generarProductos };