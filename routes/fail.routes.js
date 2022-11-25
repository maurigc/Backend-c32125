import { Router } from "express";


const router = Router();


router.get("/loginError", (req, res) => {
    res.render("pages/errorLogin");
})


router.get("/registerError", (req, res) => {
    res.render("pages/errorRegister")
})

export { router }