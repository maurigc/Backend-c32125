import { router as routesKoaProductos } from './routes/productos.koa.routes.js';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import { koaBody } from 'koa-body';
const app = new Koa();

// ________________________________________________________________________
// Middlewares
app.use(koaBody());
app.use(routesKoaProductos.routes());


// ________________________________________________________________________
// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
})