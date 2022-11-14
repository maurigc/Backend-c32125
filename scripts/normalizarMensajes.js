import { normalize, schema, denormalize } from "normalizr";
import util from "util";


// Hacemos el esquema de las entidades
const schemaAuthor = new schema.Entity("authors", {}, {idAttribute: "mail"});

const schemaMensaje = new schema.Entity("post", {
     author: schemaAuthor 
}, {idAttribute: "id"});

const schemaPost = new schema.Entity("posts", { 
    mensajes: [ schemaMensaje ] 
}, {idAttribute: "id"});



const normalizarMensajes = (arrayMensajes) => {
    const mensajesNormalizados = normalize(arrayMensajes, schemaPost);

    return mensajesNormalizados;
}


export{ normalizarMensajes };