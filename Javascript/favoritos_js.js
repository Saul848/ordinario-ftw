//Al cargar la pagina nos aseguramos de que se llene la tabla con los favoritos del usuario que accedió
window.onload = function() {
    const usuarioActual = localStorage.getItem('usuarioActivo');
    const contenedorMensaje = document.getElementById('mensaje-estado');
    const cuerpoTabla = document.getElementById('cuerpo-tabla-favoritos');

    // Validación de seguridad (si se inicio sesión)
    if (!usuarioActual) {
        contenedorMensaje.innerHTML = "<h2>Por favor, inicia sesión para ver tus favoritos.</h2>";
        return;
    }

    // Obtener la lista de IDs del usuario activo
    const todosLosFavoritos = JSON.parse(localStorage.getItem('misFavoritos')) || {};
    const misLibrosIds = todosLosFavoritos[usuarioActual] || [];

    if (misLibrosIds.length === 0) {
        contenedorMensaje.innerHTML = "<h2>Aún no tienes libros en tus favoritos.</h2>";
        return;
    }

    // Cargar el XML y filtrar
    fetch('../XML/biblioteca.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const librosXML = Array.from(xml.getElementsByTagName('libro'));

            // filtramos los libros que tengan un ID está en la lista del usuario
            const librosFavoritos = librosXML.filter(libro => 
                misLibrosIds.includes(libro.getAttribute('id'))
            );

            // pintar la tabla
            librosFavoritos.forEach(libro => {
                const titulo = libro.getElementsByTagName('titulo')[0].textContent;
                const autor = libro.getElementsByTagName('autor')[0].textContent;
                
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td><h3>${titulo}</h3></td>
                    <td>${autor}</td>
                    <td><button onclick="window.location.href='detalle_libro.html?id=${libro.getAttribute('id')}'">Ver detalles</button></td>
                `;
                cuerpoTabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar XML:", error));
};