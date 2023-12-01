function reproducirMusica() {
    var musica = document.getElementById('miMusica');
    musica.play();
}

function iniciarJuego() {
    cargarJuego();
    reproducirMusica();
}

//Función para volver al menú desde la sección de créditos
function volverAlMenu() {
    //Oculta los créditos y muestra el menú
    document.getElementById('creditos').style.display = 'none';
    document.getElementById('ajustes').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    reproducirMusica();
}

//Oculta el menú y muestra los créditos
function verCreditos() {
    // var nombresDesarrolladores = [
    //     "Realizado por: Pixel Pulse Entertainment",
    //     "NÉSTOR BERMEJILLO GONZÁLEZ",
    //     "ANTONIO BERNAL DE CELIS",
    //     "ÁNGEL LUIS RODRÍGUEZ OTERO",
    //     "ALEJANDRO TOBÍAS MÁRQUEZ",
    //     "PABLO PRIOR MOLINA"
    // ];

    // var mensaje="";

    // for (var i = 0; i < nombresDesarrolladores.length; i++) {
    //     mensaje += "- " + nombresDesarrolladores[i] + "\n";
    // }

    // alert(mensaje);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('creditos').style.display = 'block';
    reproducirMusica();
}

function salirDelJuego() {
    if (confirm("¿Estás seguro de que quieres salir del juego?")) {
        window.close();
    }
}

// function cargarJuego() {
//     console.log("Cargando juego...");
//      // Ocultar el menú
//     var menu = document.getElementById('menu');
//     menu.style.display = 'none';

//     // Mostrar el contenido del juego
//     var juego = document.getElementById('juego');
//     juego.style.display = 'block';

// }

function verAjustes(){
    document.getElementById('menu').style.display = 'none';
    document.getElementById('ajustes').style.display = 'block';
}

function cargarJuego() {
    var gameScript = document.createElement('script');
    gameScript.src = 'Code.js';
    document.head.appendChild(gameScript);

    var gameStyle = document.createElement('link');
    gameStyle.rel = 'stylesheet';
    gameStyle.href = 'Style.css';
    document.head.appendChild(gameStyle);

    document.getElementById('menu').style.display = 'none';
}

