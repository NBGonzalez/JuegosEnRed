
var musica = document.getElementById('miMusica');
var sliderVolumen = document.getElementById('sliderVolumen');
var cargaYaMostrada = sessionStorage.getItem("cargaMostrada");
var vueltasTotales;
var vueltasMenuVisible = false;
var nuevoVolumen;

function aplicarAjustes() {
    //lert("Ajustes aplicados. Vueltas totales: " + vueltasTotales);
}

function mostrarSelectorVueltas() {
    const ajustesDiv = document.getElementById("ajustes");
    const selectVueltas = document.getElementById("selectVueltas");
    const botonAplicar = document.getElementById("botonAplicarVueltas");

    if (!vueltasMenuVisible) {
        //Si el menú no está visible, lo mostramos
        if (!selectVueltas) {
            //Creamos el desplegable solo no existe
            const opcionesVueltas = ["-", "2", "3", "5", "7"];
            const select = document.createElement("select");
            select.id = "selectVueltas";

            opcionesVueltas.forEach(opcion => {
                const option = document.createElement("option");
                option.value = opcion;
                option.text = opcion;
                select.add(option);
            });

            select.addEventListener("change", () => {
                vueltasTotales = parseInt(select.value);
            });

            //Creamos el botón Aplicar solo no existe
            if (!botonAplicar) {
                const botonAplicar = document.createElement("button");
                botonAplicar.textContent = "Aplicar";
                botonAplicar.id = "botonAplicarVueltas";
                botonAplicar.addEventListener("click", () => {
                    aplicarAjustes();
                });

                ajustesDiv.appendChild(botonAplicar);
            }

            ajustesDiv.appendChild(select);
        }

        vueltasMenuVisible = true;
    } else {
        //Si el menú está visible, lo ocultamos
        if (selectVueltas) {
            ajustesDiv.removeChild(selectVueltas);
        }
        if (botonAplicar) {
            ajustesDiv.removeChild(botonAplicar);
        }

        vueltasMenuVisible = false;
    }
}

const script = document.currentScript;
vueltasTotales = script.getAttribute("data-vueltas");
console.log("Vueltas Totales:", vueltasTotales);

function reproducirMusica() {
    musica.play();
}

function iniciarJuego() {
    if(vueltasTotales == "${vueltasTotales}"){
    vueltasTotales = 3;
    }
    cargarJuego();
    if(!musica.muted)
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
    document.getElementById('controles').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    if(!musica.muted)
    reproducirMusica();
}

//Oculta el menú y muestra los créditos
function verCreditos() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('creditos').style.display = 'block';
    $(document).ready(function(){
	console.log('El DOM está cargado')
	// Acciones sobre el documento
});
    if(musica)
    reproducirMusica();
}

function verControles() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('controles').style.display = 'block';
    if(musica)
    reproducirMusica();
}

function salirDelJuego() {
    window.close();
}

function verAjustes(){
    console.log(vueltasTotales);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('ajustes').style.display = 'block';
    if(!musica.muted)
    reproducirMusica();
}

function cargarJuego() {
    var gameScript = document.createElement('script');
    gameScript.src = 'Code.js';
    document.head.appendChild(gameScript);

    var gameStyle = document.createElement('link');
    gameStyle.rel = 'stylesheet';
    gameStyle.href = 'Style.css';
    document.head.appendChild(gameStyle);

    document.getElementById('inicioSesion').style.display = 'none';
}

function estadoVolumen() {
    if(musica.muted){
        musica.muted = false;
        document.getElementById("imagenAltavoz").src = "assets/altavoz.png";
    }
    else{
    musica.muted = true;
    document.getElementById("imagenAltavoz").src = "assets/altavozmute.png";
    }
}

function cambiarVolumen(){
    nuevoVolumen = sliderVolumen.value;
    musica.volume = nuevoVolumen;
}

function simularCarga() {
    reproducirMusica();
    var barraCarga = document.getElementById("barraCarga");
    var porcentaje = 0;
    
    var intervalo = setInterval(function() {
      porcentaje += 1;
      barraCarga.style.width = porcentaje + "%";
  
      if (porcentaje >= 100) {
        clearInterval(intervalo);
  
        //Oculta la pantalla de carga y muestra el juego
        document.getElementById("pantallaCarga").style.display = "none";
       
      }
    }, 50);
  }

  if (!cargaYaMostrada) {
    //Si no se ha mostrado, simula la carga del juego
    simularCarga();
  
    //Marca que la pantalla de carga ya se ha mostrado
    sessionStorage.setItem("cargaMostrada", "true");
  } else {
    //Si ya se mostró, oculta la pantalla de carga y muestra el juego directamente
    document.getElementById("pantallaCarga").style.display = "none";
  }

  function mostrarInicioSesion() {
    document.getElementById('registro').style.display = 'none';
    document.getElementById('inicioSesion').style.display = 'block';
}

function mostrarRegistro() {
    document.getElementById('inicioSesion').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
}

function irIniciarSesion() {
    document.getElementById('inicioSesion').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}

function registrar() {
var name = document.getElementById('nombre').value;
var contr = document.getElementById('nuevaContrasena').value;
$.ajax({
    method: "POST",
    url: "http://localhost:8080/usuarios", // Asegúrate de usar la URL correcta
    data: JSON.stringify({ nombre: name, password: contr }),
    processData: false,
    headers: {
        "Content-type": "application/json"
    }
}).done(function (data, textStatus, jqXHR) {
    console.log("Usuario creado con éxito. Nuevo ID: " + data);
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error al crear usuario: " + textStatus + " " + errorThrown);
    console.log(jqXHR.responseText);
});
}

function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/usuarios/login",
        data: JSON.stringify({ nombre: usuario, password: contrasena }),
        processData: false,
        headers: {
            "Content-type": "application/json"
        }
    }).done(function (data, textStatus, jqXHR) {
        console.log("Inicio de sesión exitoso: " + data);
        iniciarJuego();  // Llama a la función para iniciar el juego
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error al iniciar sesión: " + textStatus + " " + errorThrown);
        console.log(jqXHR.responseText);
    });
}
