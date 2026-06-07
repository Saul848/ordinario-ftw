fetch('../XML/biblioteca.xml')
.then(response => response.text())
.then(str => {
    const parser = new DOMParser();
    const xmlBiblioteca = parser.parseFromString(str, "text/xml");

    llenarTablaLibros(xmlBiblioteca);
});

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
        agregarFilaATabla(libro,titulo, genero,autor);

        
    }
}


function agregarFilaATabla(libro, titulo, genero, autor) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td><h3>${titulo}</h3></td>
        <td>${genero}</td>
        <td>${autor}</td>
        <td>
            <button onclick="window.location.href='detalle_libro.html?id=${libro.getAttribute('id')}'">
                Ver detalles
            </button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);
}