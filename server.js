import { app } from "./app.js";
import { Server as HTTPServer } from "http";
import { Server as IOServer} from "socket.io";
import { iniciarSocket } from "./socket/iniciarSocket.js";
//********************* import cluster ************************
import cluster from "cluster";
import os from "os";
// ********************* import Minimist ************************
import minimist from "minimist";
const args = minimist(process.argv.slice(2));


//_________________________________________________________________________________________________________________________
// Instanciado de servidor
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

//_________________________________________________________________________________________________________________________
// Puerto
const PORT = args.PORT || 8080;

const numCPUs = os.cpus().length;

if (args.MODO === "fork") {
    try {
        httpServer.listen(PORT, () => {
            console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
            console.log(`en el proceso ${process.pid}`)
        })
    } catch (error) {
        console.log(error);
    }
    
} else if (args.MODO === "cluster"){
    try {
        if (cluster.isPrimary) {
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
                
            }
        } else {
            httpServer.listen(PORT, () => {
                console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
                console.log(`en el proceso ${process.pid}`)
            })
        }
    } catch (error) {
        console.log(error);
    }
   
}else{
    try {
        httpServer.listen(PORT, () => {
            console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
            console.log(`en el proceso ${process.pid}`)
        })
    } catch (error) {
        console.log(error)
    }
    
}

//_________________________________________________________________________________________________________________________
// Socket
iniciarSocket(io);