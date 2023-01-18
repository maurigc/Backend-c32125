import { logConsola } from "../scripts/logger.js";

const errorLogin = async (req, res) => {
    try {
        res.render("pages/errorLogin");
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
}  


const errorRegister = async (req, res) => {
    try {
        res.render("pages/errorRegister");
    } catch (error) {
        logConsola.warn(error);
        res.status(404).json(error);
    }
    
}

export { errorLogin, errorRegister };