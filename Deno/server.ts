import { serve } from "https://deno.land/std@0.52.0/http/server.ts";

const PORT = 8000

const server = serve({port: PORT});

console.log(`Corriendo en el puerto:${PORT}`);

for await (const req of server){
    req.respond({body: 'Hello world'});
}

