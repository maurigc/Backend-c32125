import { Router } from "express";
import { logConsola } from "../scripts/logger.js";

const router = Router();


router.get("/loginError", async (req, res) => {
    try {
        res.render("pages/errorLogin");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
    
})


router.get("/registerError", async (req, res) => {
    try {
        res.render("pages/errorRegister");
    } catch (error) {
        logConsola.warn(error);
        res.status(404).json(error);
    }
    
})

export { router }