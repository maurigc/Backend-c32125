class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    // Obtener el nombre completo.
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`);
    }


    // Agregar una mascota.
    addMascota(pet){
        this.mascotas.push(pet);
        console.log(this.mascotas)
    }

    // Obtener la cantidad de mascotas que tiene el usuario.
    countMascotas(){
        console.log(this.mascotas.length)
    }

    // Agregar un libro con su nombre y autor.
    addBook(name, autor){
        this.libros.push({name, autor});
        console.log(this.libros);
    }

    // Obtener el nombre de los libros que tenga el usuario
    getBookNames(){
        this.libros.forEach( (libro) => {
            console.log(libro.name);
        })
    }


}


const usuario1 = new Usuario("Mauricio", "Garcia", [], []);

usuario1.getFullName();

usuario1.addMascota("perro");

usuario1.addMascota("gato");

usuario1.countMascotas();

usuario1.addBook("Don Quijote de la mancha", "Miguel de Cervantes");

usuario1.getBookNames();