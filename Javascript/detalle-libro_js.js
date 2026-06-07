window.onload = function() {
    // 1. Obtener el ID de la URL (ej: detalle_libro.html?id=1)
    const params = new URLSearchParams(window.location.search);
    const idLibro = params.get('id');

    if (!idLibro) {
        document.getElementById('detalle-container').innerHTML = "<h1>Error: No se especificó un libro.</h1>";
        return;
    }

    // 2. Cargar el XML
    fetch('../XML/biblioteca.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            
            // 3. Buscar el libro que tenga el atributo id igual al de la URL
            const libros = Array.from(xml.getElementsByTagName('libro'));
            const libroEncontrado = libros.find(l => l.getAttribute('id') === idLibro);

            // 4. Si lo encontramos, inyectamos los datos
            if (libroEncontrado) {
                document.getElementById('titulo').textContent = libroEncontrado.getElementsByTagName('titulo')[0].textContent;
                document.getElementById('autor').textContent = libroEncontrado.getElementsByTagName('autor')[0].textContent;
                document.getElementById('anio').textContent = libroEncontrado.getElementsByTagName('anio')[0].textContent;
                document.getElementById('genero').textContent = libroEncontrado.getElementsByTagName('genero')[0].textContent;
                document.getElementById('descripcion').textContent = libroEncontrado.getElementsByTagName('descripcion')[0].textContent;
            } else {
                document.getElementById('detalle-container').innerHTML = "<h1>Libro no encontrado.</h1>";
            }
        })
        .catch(error => console.error("Error al cargar el XML:", error));
};