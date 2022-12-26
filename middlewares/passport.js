import passport from "passport";
import passportLocal from "passport-local";
import UsuariosDao from "../DAOs/usuarios.dao.js";
import { comparar, encriptar } from "../scripts/encriptarContraseñas.js";

const LocalStrategy = passportLocal.Strategy

const ContenedorUsuarios = new UsuariosDao();

//Middleware para login
passport.use("login", new LocalStrategy( async(username, password, done) => {
    const usuarios = await ContenedorUsuarios.getAll();
    
    const user = usuarios.find(user => user.username === username);
    

    if(user){
        const validarPassword = comparar(user, password); 
        console.log("hasta aca llego")
        if(validarPassword){
            return done(null, user);
        }else{
            return done(null, false);
        } 
    }else{
        return done(null, false);
    }
} ))


// Middleware para registrarse.
passport.use("register", new LocalStrategy( { passReqToCallback: true }, async(req, username, password, done) => {
    const usuarios = await ContenedorUsuarios.getAll();

    const usuarioEncontrado = usuarios.find(user => user.username === username)
   

    if(usuarioEncontrado){
        return done(null, false);
    }else{
        const nuevoUsuario = {
            _id: `${usuarios.length === 0 ? 1 : usuarios.length + 1}`,
            username,
            password: encriptar(password),
        }

        await ContenedorUsuarios.save(nuevoUsuario);

        return done(null, nuevoUsuario);
    }

} ))


passport.serializeUser( (user, done) => {
    done(null, user._id);
})

passport.deserializeUser( async(id, done) => {
    let user = await ContenedorUsuarios.getById(id);
    done(null, user)
})

export { passport };