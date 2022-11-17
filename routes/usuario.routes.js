import { Router } from "express";

const router = Router();

//__________________________________________________________________________________________________
// Ruta para login
router.post("/login", (req, res) => {
    const { usuario } = req.body;

    req.session.usuario = usuario;
    req.session.logged = true;

    res.redirect("/api/productos")
})
//________________________________________________________________________________________
// Ruta para logout
router.get("/logout", (req, res) => {
    const usuario = req.session.usuario;
    req.session.destroy(error => {
        if(error){
            res.status(404).send(error)
        }
    })
    
    res.render("pages/indexDespedida", {usuario: usuario})

    
})

export { router };