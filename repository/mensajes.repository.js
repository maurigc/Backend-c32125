import MensajesDto from "../DTOs/mensajes.dto.js";
import { mensajesDao } from "../factory/factory.js";



class RepositorioMensajes{
    constructor(){      
    }


    async getAll(){
        const mensajes = await mensajesDao.getAll();
        
        const mensajesDto = mensajes.map( mensaje => {
            return new MensajesDto(mensaje);
        })

        return mensajesDto;
    }


    async getById(idMensaje){
        const mensaje = await mensajesDao.getById(idMensaje);

        return new MensajesDto(mensaje)
    }

    
    async save(mensaje){
        const mensajeDto = new MensajesDto(mensaje)
        
        await mensajesDao.save(mensajeDto);
    }


    async deleteById(idMensaje){
        await mensajesDao.deleteById(idMensaje);
    }

}


export default RepositorioMensajes;