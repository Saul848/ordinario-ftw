fetch('../XML/biblioteca.xml')
.then(response => response.text())
.then(str => {
    const parser = new DOMParser();
    const xmlBiblioteca = parser.parseFromString(str, "text/xml");

    llenarTablaAutores(xmlBiblioteca);
});


function llenarTablaAutores(biblioteca){
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = '';

    const autores = Array.from(biblioteca.getElementsByTagName('autor')).filter(autor => {
        return autor.getElementsByTagName('nombre').length > 0;
    });

    cuerpoTabla.innerHTML = '';

    for(let autor of autores){
        console.log(autor);
        const nombre = autor.getElementsByTagName('nombre')[0].textContent;
        const nacionalidad = autor.getElementsByTagName('nacionalidad')[0].textContent;

        agregarFilaATabla(nombre, nacionalidad);
    }
    //cargar los autores en localStorage    
    const autoresLocales = JSON.parse(localStorage.getItem('misAutores')) || [];

    autoresLocales.forEach(autor => {
        agregarFilaATabla(autor.nombre, autor.nacionalidad);
    });
}

function agregarFilaATabla(nombre, nacionalidad) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${nombre}</td><td>${nacionalidad}</td>`;
    cuerpoTabla.appendChild(fila);
}

function agregarAutor(){
    const nombreInput = document.getElementById('nombre').value;
    const nacionalidadInput = document.getElementById('nacionalidad').value;

    if (nombreInput === "" || nacionalidadInput === "") {
        alert("Por favor, completa ambos campos.");
        return; 
    }

    //Validación de existencia en localStorage o en archivo xml
    let listaLocales = JSON.parse(localStorage.getItem('misAutores')) || [];

    const nombreNormalizado = nombreInput.toLowerCase();
    
    const estaEnLocal = listaLocales.some(autor => autor.nombre.toLowerCase() === nombreNormalizado);

    if (estaEnLocal) {
        alert("¡Error! Este autor ya existe en la biblioteca");
        return;
    }

    //Lista de autores existentes en localStorage
    let listaAutores = JSON.parse(localStorage.getItem('misAutores')) || [];
    //Nuevo autor que se agregará a esta lista
    listaAutores.push({ nombre: nombreInput, nacionalidad: nacionalidadInput });
    //Guardar de nuevo en localStorage convertido en texto
    localStorage.setItem('misAutores', JSON.stringify(listaAutores));

    const tabla = document.getElementById('cuerpo-tabla');
    console.log("Cuerpo de tabla encontrado:", tabla);
    const newFila = document.createElement('tr');

    newFila.innerHTML = `<td>${nombreInput}</td><td>${nacionalidadInput}</td>`;

    tabla.appendChild(newFila);
    //Limpiar la seccion del formulario 
    document.getElementById('formulario-nuevo-actor').reset();
}

function limpiarAutores() {
    // 1. Borramos del almacenamiento
    localStorage.removeItem('misAutores');
    
    location.reload(); 
}