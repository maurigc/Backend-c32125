import { Router } from "express";
import { passport } from "../middlewares/passport.js";
import { getLogout, getSingup, postSignup, postLogin } from "../controller/usuario.controller.js";

const router = Router();

//__________________________________________________________________________________________________
// Ruta para login
router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/fail/loginError"
}), postLogin)

//__________________________________________________________________________________________________
// Ruta para logout
router.get("/logout", getLogout);

//__________________________________________________________________________________________________
//Ruta para registrarse.
router.get("/signup", getSingup);

//__________________________________________________________________________________________________
//Ruta para registrarse.
router.post("/signup", postSignup);


export { router };