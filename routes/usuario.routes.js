import { Router } from "express";
import { passport } from "../middlewares/passport.js";

const router = Router();

//__________________________________________________________________________________________________
// Ruta para login
router.post("/login", passport.authenticate("login", {
    // successRedirect: "/api/productos",
    failureRedirect: "/api/fail/loginError"
}), (req, res) => {
    req.session.usuario = req.user.username;
    res.redirect("/api/productos");
})

//__________________________________________________________________________________________________
// Ruta para logout
router.get("/logout", (req, res) => {
    
    const username = req.session.usuario;

    req.session.destroy(error => {
        if(error){
            res.status(404).send(error)
        }
    })
    
    res.render("pages/indexDespedida", {usuario: username})

    
})

//__________________________________________________________________________________________________
//Ruta para registrarse.
router.get("/signup", (req, res) => {
    res.render("pages/indexRegister");
})

//__________________________________________________________________________________________________
//Ruta para registrarse.
router.post("/signup", passport.authenticate("register", {
    successRedirect: "/api/",
    failureRedirect: "/api/fail/registerError"
}))


export { router };