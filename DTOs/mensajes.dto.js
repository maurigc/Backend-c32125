class MensajesDto{
    constructor(mensaje){
        this.author = {
            id: mensaje.author.id,
            nombre: mensaje.author.nombre,
            apellido: mensaje.author.apellido,
            edad: mensaje.author.edad,
            alias: mensaje.author.alias,
            avatar: mensaje.author.avatar
        },
        this.text = mensaje.text
    }
}


export default MensajesDto;
