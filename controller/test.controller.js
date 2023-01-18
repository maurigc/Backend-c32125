import { logConsola } from "../scripts/logger.js";
import { fork } from "child_process";

const getInfoProcesador = (req, res) => {
    try {
        res.render("pages/infoProcess", {
            args: process.argv.slice(2),
            cwd: process.cwd(),
            pid: process.pid,
            numProcess: process.env.NUMBER_OF_PROCESSORS,
            so: process.platform,
            version: process.version,
            memoria: process.memoryUsage().rss,
            path: process.execPath
    
        })
        
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error);
    }
}


const getRandom = (req, res) => {
    try {
        const cantidad = req.query.cant

        const calculoRandom = fork("./scripts/calculoRandom.js");

        calculoRandom.send(!cantidad ? 100000000 : cantidad);
        calculoRandom.on("message", calculo => {
            res.json(calculo);
        })
    } catch (error) {
        logConsola.info(error);
        res.status(404).json(error)
    }
    
}


export { getInfoProcesador, getRandom }