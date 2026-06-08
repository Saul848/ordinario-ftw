//Variable local del archivo xml
let xmlBiblioteca = null;

/*
    Función que se carga en automatico cuando la pagina es cargada, en este caso
    le asigna el valor real a la variable global del archivo xml
*/
window.onload = function(){
    fetch('../XML/biblioteca.xml')
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        xmlBiblioteca = parser.parseFromString(str, "text/xml");
        
        llenarTablaLibros(xmlBiblioteca);
    });
}


//Función para llenar la tabla de libros con el archivo xml (similar a la de autores)
function llenarTablaLibros(biblioteca){
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = '';

    const libros = Array.from(biblioteca.getElementsByTagName('libro')).filter(autor => {
        return autor.getElementsByTagName('titulo').length > 0;
    });


    for(let libro of libros){
        console.log(libro);
        const titulo = libro.getElementsByTagName('titulo')[0].textContent;
        const genero = libro.getElementsByTagName('genero')[0].textContent;
        const autor = libro.getElementsByTagName('autor')[0].textContent;
        const anio = libro.getElementsByTagName('anio')[0].textContent;
        agregarFilaATabla(libro,titulo, genero,autor,anio);

        
    }
}

//Función para agregar los elementos necesarios a la tabla de libros
function agregarFilaATabla(libro, titulo, genero, autor,anio) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td><h3>${titulo}</h3></td>
        <td>${genero}</td>
        <td>${autor}</td>
        <td>${anio}</td>
        <td class="acciones-container">
            <button class="btn-detalles" onclick="window.location.href='detalle_libro.html?id=${libro.getAttribute('id')}'">
                Ver detalles
            </button>
            <button class="btn-favorito" onclick="marcarFavorito('${libro.getAttribute('id')}')">
                ❤️ Favorito
            </button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);
}

//ordenamiento de mayor a menor
function ordenarPorAnio(){
    if (!xmlBiblioteca) {
        alert("El archivo XML aún se está cargando. Por favor, espera.");
        return;
    }

    //Convertimos el archivo recuperado a un array de javascript
    const librosXML = Array.from(xmlBiblioteca.getElementsByTagName('libro'));

    const listaLibros = librosXML.map(libro => ({
        id: libro.getAttribute('id'),
        titulo: libro.getElementsByTagName('titulo')[0].textContent,
        autor: libro.getElementsByTagName('autor')[0].textContent,
        anio: parseInt(libro.getElementsByTagName('anio')[0].textContent),
        genero: libro.getElementsByTagName('genero')[0].textContent
    }));

    //se ordenan de mayor a menor (por año)
    listaLibros.sort((a, b) => b.anio - a.anio);

    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = '';

    listaLibros.forEach(libro => {
        // Creamos un nodo simulado para que tu función agregarFilaATabla pueda hacer .getAttribute('id') sin romperse
        const nodoSimulado = { getAttribute: () => libro.id };
        
        agregarFilaATabla(nodoSimulado, libro.titulo, libro.genero, libro.autor, libro.anio);
    });
}

//Ordenamiento de menor a mayor
function ordenarPorAnio2(){
    if (!xmlBiblioteca) {
        alert("El archivo XML aún se está cargando. Por favor, espera.");
        return;
    }

    //Convertimos el archivo recuperado a un array de javascript
    const librosXML = Array.from(xmlBiblioteca.getElementsByTagName('libro'));

    const listaLibros = librosXML.map(libro => ({
        id: libro.getAttribute('id'),
        titulo: libro.getElementsByTagName('titulo')[0].textContent,
        autor: libro.getElementsByTagName('autor')[0].textContent,
        anio: parseInt(libro.getElementsByTagName('anio')[0].textContent),
        genero: libro.getElementsByTagName('genero')[0].textContent
    }));

    //se ordenan de mayor a menor (por año)
    listaLibros.sort((a, b) => a.anio - b.anio);

    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = '';

    listaLibros.forEach(libro => {
        // Creamos un nodo simulado para que tu función agregarFilaATabla pueda hacer .getAttribute('id') sin romperse
        const nodoSimulado = { getAttribute: () => libro.id };
        
        agregarFilaATabla(nodoSimulado, libro.titulo, libro.genero, libro.autor, libro.anio);
    });
}

//Funcion para marcar un libro como favorito y asociarlo con el ID de un usuario especifico
function marcarFavorito(idLibro) {
    const botonFav = document.getElementsByClassName("btn-favorito")
    
    const usuarioActual = localStorage.getItem('usuarioActivo'); //usuario
    
    if (!usuarioActual) {
        alert("Debes iniciar sesión para guardar favoritos.");
        return;
    }

    // Traer todos los favoritos o crear un objeto vacío si no existe
    let todosLosFavoritos = JSON.parse(localStorage.getItem('misFavoritos')) || {};

    //Si este usuario aún no tiene lista, le creamos un arreglo vacío
    if (!todosLosFavoritos[usuarioActual]) {
        todosLosFavoritos[usuarioActual] = [];
    }

    //Agregar el libro si no lo tiene repetido
    if (!todosLosFavoritos[usuarioActual].includes(idLibro)) {
        todosLosFavoritos[usuarioActual].push(idLibro);
        localStorage.setItem('misFavoritos', JSON.stringify(todosLosFavoritos));
        alert("¡Añadido a tus favoritos!");
    } else {
        alert("Este libro ya estaba en tus favoritos.");
    }
}