function iniciarJuego() {
    cargarJuego();
}

function verCreditos() {
    var nombresDesarrolladores = [
        "Realizado por: Pixel Pulse Entertainment",
        "NÉSTOR BERMEJILLO GONZÁLEZ",
        "ANTONIO BERNAL DE CELIS",
        "ÁNGEL LUIS RODRÍGUEZ OTERO",
        "ALEJANDRO TOBÍAS MÁRQUEZ",
        "PABLO PRIOR MOLINA"
    ];

    var mensaje="";

    for (var i = 0; i < nombresDesarrolladores.length; i++) {
        mensaje += "- " + nombresDesarrolladores[i] + "\n";
    }

    alert(mensaje);
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