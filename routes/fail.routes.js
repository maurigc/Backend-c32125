import { Router } from "express";
import { errorLogin, errorRegister } from "../controller/fail.controller.js";

const router = Router();


router.get("/loginError", errorLogin);


router.get("/registerError", errorRegister);

export { router }