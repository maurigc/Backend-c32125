import { schema } from "normalizr";

const schemaAuthor = new schema.Entity("authors");

const schemaMensaje = new schema.Entity("post", {
     author: schemaAuthor 
});

const mensajes = new schema.Entity("posts", { 
    mensajes: [ schemaMensaje ] 
});


export { mensajes };