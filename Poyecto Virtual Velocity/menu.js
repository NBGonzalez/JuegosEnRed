var musica = document.getElementById('miMusica');
var sliderVolumen = document.getElementById('sliderVolumen');
var cargaYaMostrada = sessionStorage.getItem("cargaMostrada");

function reproducirMusica() {
    musica.play();
}

function iniciarJuego() {
    cargarJuego();
    reproducirMusica();
}

function volverDesdePausa(){
    window.location.href = 'Index.html';
}

//Función para volver al menú desde la sección de créditos
function volverAlMenu() {
    //Oculta los créditos y muestra el menú
    document.getElementById('creditos').style.display = 'none';
    document.getElementById('ajustes').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    // if(!musica.muted)
    // reproducirMusica();
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
    if(musica)
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
    //if(!musica.muted)
    //reproducirMusica();
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

function estadoVolumen() {
    if(musica.muted){
        musica.muted = false;
        //document.getElementById("imagenAltavoz").src = "assets/altavoz.png";
    }
    else{
    musica.muted = true;
    //document.getElementById("imagenAltavoz").src = "assets/altavozmute.png";
    }
}

function cambiarVolumen(){
    var nuevoVolumen = sliderVolumen.value;
    musica.volume = nuevoVolumen;
}

function simularCarga() {
    var barraCarga = document.getElementById("barraCarga");
    var porcentaje = 0;
    
    var intervalo = setInterval(function() {
      porcentaje += 1;
      barraCarga.style.width = porcentaje + "%";
  
      if (porcentaje >= 100) {
        clearInterval(intervalo);
  
        // Oculta la pantalla de carga y muestra el juego
        document.getElementById("pantallaCarga").style.display = "none";
       
      }
    }, 50);
  }

  if (!cargaYaMostrada) {
    // Si no se ha mostrado, simula la carga del juego
    simularCarga();
  
    // Marca que la pantalla de carga ya se ha mostrado en la sesión actual
    sessionStorage.setItem("cargaMostrada", "true");
  } else {
    // Si ya se mostró, oculta la pantalla de carga y muestra el juego directamente
    document.getElementById("pantallaCarga").style.display = "none";
    
  }
