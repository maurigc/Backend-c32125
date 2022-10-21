const socket = io();

socket.on("tabla", (producto) => {
    generarTabla(producto);
})

socket.on("mensaje", (mensaje) => {
    mostrarMensaje(mensaje);
})


// Funcion para mostrar mensaje en HTML
const mostrarMensaje = (arrayMensajes) => {
    if(arrayMensajes.length === 0){
        document.getElementById('contenedorMensajes').innerHTML = "<h3>No hay mensajes para mostrar</h3>";
    }else {
        const html = arrayMensajes.map((mensaje) => {
            return(`
                <div>
                    <strong class="mail">${mensaje.mail}</strong>[${mensaje.fecha}]:<em class="texto">${mensaje.texto}</em> </div>`)}).join(" ");
            
            
            document.getElementById('contenedorMensajes').innerHTML = html;
    }
    
}


// Funcion para enviar mensaje a través del chat
const mandarMensaje = () => {

    const inputMail = document.getElementById("mail").value;
    const inputTexto = document.getElementById("texto").value;

    socket.emit("nuevoMensaje", {mail: inputMail, texto: inputTexto, fecha: new Date().toLocaleString()});

    inputTexto = "";
        

    return false;
}


// Funcion para agregar un producto
const agregarProducto = () => {
    const inputName = document.getElementById("name").value;
    const inputPrice = document.getElementById("price").value;
    const inputUrl = document.getElementById("url").value;

    const producto = {
        name: inputName, 
        price: inputPrice, 
        url: inputUrl
    }

    socket.emit("nuevoProducto", producto);

    
}



// Funcion para generar la tabla en el HTML
const generarTabla = (arrayProductos) => {
    const tabla = document.getElementById("tabla");
    const cuerpoTabla = document.createElement("tbody");

    if(arrayProductos.length > 0){
        arrayProductos.forEach( p => {
            const fila = document.createElement("tr");

            const tdNombre = document.createElement("td");
            tdNombre.innerText = p.name;

            const tdPrecio = document.createElement("td");
            tdPrecio.innerText = p.price;

            const image = document.createElement("img");
            image.src = p.url;
            image.width = "40";
            image.height = "40";
            const tdUrl = document.createElement("td");
            tdUrl.className = "td-imagen";
            tdUrl.append(image)
        
            fila.append(tdNombre, tdPrecio, tdUrl);

            cuerpoTabla.append(fila);
        });

        tabla.append(cuerpoTabla);
    }else{     
        const h1 = document.createElement("h1");
        h1.innerText = "No hay productos para mostrar"

        cuerpoTabla.append(h1);

        tabla.append(cuerpoTabla);
        
    }
    
        
}




