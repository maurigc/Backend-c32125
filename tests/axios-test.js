import axios from "axios";


// Test para corroborar el agregado de un producto a la DB
;(async() => {
    try {
        const respuesta = await axios.post('http://localhost:8000/api/productos/', {
            name: "coca",
            price: 200,
            urlImage: "https://cdn4.iconfinder.com/data/icons/fruits-79/48/07-raspberry-512.png"
        });
        
        console.log('---------- producto agregado ----------')
        console.log(respuesta.data);
        
    } catch (error) {
        console.log(error);
    }
})();    


// Test para corroborar la obtencion de un producto por ID.
(async() => {
    try {
        const respuesta = await axios.get('http://localhost:8000/api/productos/63d95a1dd01edeef8066a475/');
        
        console.log('---------- Producto obtenido por id ----------');
        console.log(respuesta.data);
        
    } catch (error) {
        console.log(error);
    }
})();


// Test para corroborar la obtencion de todos los productos de la DB.
(async() => {
    try {
        const respuesta = await axios.get('http://localhost:8000/api/productos/');
        
        console.log('----------- Todos los productos ----------');
        console.log(respuesta.data);
        
    } catch (error) {
        console.log(error);
    }
})();



// Test para comprobar que elimine un producto de la DB.
(async() => {
    try {
        await axios.delete('http://localhost:8000/api/productos/63d95a1dd01edeef8066a475/');
    
        console.log('eliminado');
        
    } catch (error) {
        console.log(error);
    }
})();