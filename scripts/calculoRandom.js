const random = (cantidad) => {
    let listaNumeros = {};

    for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.ceil(Math.random() * 1000)

        if(!listaNumeros[numeroAleatorio]){
            listaNumeros[numeroAleatorio] = 1;
        }else{
            listaNumeros[numeroAleatorio] += 1;
        }

    }

    return listaNumeros
}

process.on("message", cantidad => {
    process.send(random(cantidad))
})
