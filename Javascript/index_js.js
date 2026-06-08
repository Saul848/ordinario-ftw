function iniciarSesion() {
    const nombre = document.getElementById('nombre').value;
    const contra = document.getElementById('password').value;
    const msjError = document.getElementById('mensaje-error');

    if (nombre === "" || contra === "") {
        alert("Por favor, llena ambos campos.");
        return;
    }

    fetch('XML/biblioteca.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlBiblioteca = parser.parseFromString(data, "application/xml");
            
            // 3. Buscar en los usuarios del XML
            const usuariosXML = Array.from(xmlBiblioteca.getElementsByTagName('usuario'));
            const estaEnXML = usuariosXML.find(user => {
                const nombreXML = user.getElementsByTagName('nombre')[0].textContent;
                const passXML = user.getElementsByTagName('password')[0].textContent;
                
                return nombreXML === nombre && passXML === contra;
            });

            //Validaracceso
            if (estaEnXML) {
                localStorage.setItem('usuarioActivo', nombre);
                // Redirigimos a la página principal
                window.location.href = 'HTML/inicio.html'; 
            } else {
                // Si no coincide, mostramos error
                msjError.style.display = 'block';
            }
        })
        .catch(error => console.error("Error al cargar XML:", error));
}