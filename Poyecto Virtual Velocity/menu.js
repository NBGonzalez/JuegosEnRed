

function iniciarJuego() {
    alert("¡Juego iniciado!");
    cargarJuego();
}

function verCreditos() {
    alert("Desarrollado por [Tu Nombre]");
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
    gameScript.src = 'code.js';
    document.head.appendChild(gameScript);

    var gameStyle = document.createElement('link');
    gameStyle.rel = 'stylesheet';
    gameStyle.href = 'style.css';
    document.head.appendChild(gameStyle);

    document.getElementById('menu').style.display = 'none';
}