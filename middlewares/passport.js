import passport from "passport";
import passportLocal from "passport-local";
import { usuariosDao } from "../DAOs/factory.js";
import { comparar, encriptar } from "../scripts/encriptarContraseñas.js";

const LocalStrategy = passportLocal.Strategy


//Middleware para login
passport.use("login", new LocalStrategy( async(username, password, done) => {
    const usuarios = await usuariosDao.getAll();
    
    const user = usuarios.find(user => user.username === username);
    

    if(user){
        const validarPassword = comparar(user, password); 
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
    const usuarios = await usuariosDao.getAll();
    
    const usuarioEncontrado = usuarios.find(user => user.username === username)
   

    if(usuarioEncontrado){
        return done(null, false);
    }else{
        const nuevoUsuario = {
            _id: `${usuarios.length === 0 ? 1 : usuarios.length + 1}`,
            username,
            password: encriptar(password),
        }

        await usuariosDao.save(nuevoUsuario);

        return done(null, nuevoUsuario);
    }

} ))


passport.serializeUser( (user, done) => {
    
    done(null, user._id);
})

passport.deserializeUser( async(id, done) => {
    let user = await usuariosDao.getById(id);
    
    done(null, user)
})

export { passport };