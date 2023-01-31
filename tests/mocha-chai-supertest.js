import supertest from "supertest";
import { expect } from "chai";
import dotenv from 'dotenv';
dotenv.config();

let request = supertest('http://localhost:8000/api')

describe('Test de api productos', () => {
    
    after(() => {
        console.log('--------------------------- Fin del test ---------------------------')
    })
    

    describe('GET', () => {
        it('Devuelve los productos y retorna un status: 200.', async() => {

            const respuesta = await request.get("/productos");
            
            expect(respuesta.status).to.eql(200);
            expect(respuesta.type).to.eql('application/json');
            
        })

        it('Devuelve un producto por su ID y comprueba su estructura.', async() => {
            const respuesta = await request.get("/productos/63d96450d01edeef8066a47e");

            expect(respuesta.body).to.include.keys('name', 'price', 'urlImage');
        })


    })

    describe('POST', () => {
        it('Incorpora un nuevo producto a la DB', async() => {
            const producto = {
                name: 'cafe',
                price: 800,
                urlImage: 'https://cdn4.iconfinder.com/data/icons/fruits-79/48/07-raspberry-512.png'
            }

            const respuesta = await request.post('/productos').send(producto);

            expect(respuesta.status).to.eql(200)
        })

        it('Elimina un producto de la DB', async() => {
            const respuesta = await request.delete('/productos/63d96450d01edeef8066a47e');

            expect(respuesta.status).to.eql(200)
        })
    })

    
})