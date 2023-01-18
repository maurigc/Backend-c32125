import { logConsola } from "../scripts/logger.js";
import { passport } from "../middlewares/passport.js";




const getLogout = async(req, res) => {
    
    const username = req.session.usuario;

    req.session.destroy(error => {
        if(error){
            res.status(404).send(error)
        }
    })
    
    res.render("pages/indexDespedida", {usuario: username})

}

const postLogin = (req, res) => {
    req.session.usuario = req.user.username;
    
    res.redirect("/api/productos");
}


const getSingup = async(req, res) => {
    try {
        res.render("pages/indexRegister");
        
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
}



const postSignup = passport.authenticate("register", {
    successRedirect: "/api/",
    failureRedirect: "/api/fail/registerError"
})



export { getLogout, postLogin, getSingup, postSignup }