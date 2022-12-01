import { Router } from "express";
import { fork } from "child_process";


const router = Router();


router.get("/random", (req, res) => {
    const cantidad = req.query.cant
   
    const calculoRandom = fork("./scripts/calculoRandom.js");

    calculoRandom.send(!cantidad ? 100000000 : cantidad);
    calculoRandom.on("message", calculo => {
        res.json(calculo);
    })
})


router.get("/info", (req, res) => {

    res.render("pages/infoProcess", {
        args: process.argv.slice(2),
        cwd: process.cwd(),
        pid: process.pid,
        so: process.platform,
        version: process.version,
        memoria: process.memoryUsage().rss,
        path: process.execPath

    })
})


export { router };
