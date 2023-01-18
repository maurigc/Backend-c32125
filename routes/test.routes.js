import { Router } from "express";
import { getInfoProcesador, getRandom } from "../controller/test.controller.js";
 
const router = Router();


router.get("/random", getRandom)


router.get("/info", getInfoProcesador)


export { router };
