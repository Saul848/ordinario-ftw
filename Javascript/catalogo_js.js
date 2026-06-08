let xmlBiblioteca = null;

window.onload = function(){
    fetch('../XML/biblioteca.xml')
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        xmlBiblioteca = parser.parseFromString(str, "text/xml");
        
        llenarTablaLibros(xmlBiblioteca);
    });
}



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

function agregarFilaATabla(libro, titulo, genero, autor,anio) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td><h3>${titulo}</h3></td>
        <td>${genero}</td>
        <td>${autor}</td>
        <td>${anio}</td>
        <td>
            <button onclick="window.location.href='detalle_libro.html?id=${libro.getAttribute('id')}'">
                Ver detalles
            </button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);
}

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