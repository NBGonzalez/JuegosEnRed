//$(document).ready(function () {
var config = {
    type: Phaser.AUTO,
    width: 1088,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

class Jugador{
    constructor(_vel, _velD){
    this.vel = _vel;
    this.velD = _velD;
    this.fisicas = null;
    this.inver = false;
    this.numInver = 1;
    this.cong = false;
    this.numCong = 1;
    this.turb = false;
    this.numTurb = 1;
    //this.animacionActual = null;
    }
    get velocidad(){
        return this.vel;
    }
    get velocidadD(){
        return this.velD;
    }
}

var estilo1 = {
    fontSize: '24px',
    fontFamily: 'MiFuente',
    fill: 'rgb(0, 153, 204)'
};

var estilo2 = {
    fontSize: '24px',
    fontFamily: 'MiFuente',
    fill: 'rgb(153, 204, 0)'
};

var estilo3 = {
    fontSize: '100px',
    fontFamily: 'MiFuente',
    fill: 'rgb(255, 255, 255)'
};

var J1 = new Jugador(150, 100);
J1.nombre = 'J1';

var J2 = new Jugador(150, 100);
J2.nombre = 'J2'

var back;
var gameOver = false;
var juegoPausado = false;
var chatActivo = false;
var J2Win;

var tracks;
var elements;
var detection;
var assets;
var icons;

var icTurb;
var icInv;
var icCong;

var teclaW;
var teclaA;
var teclaD;
var teclaS;

var teclaI;
var teclaJ;
var teclaL;
var teclaK;

var teclaC;
var teclaV;

var teclaE;

var numVueltasJ1; 
var numVueltasJ2;

var numVueltasJ1Text; 
var numVueltasJ2Text;
var esperando;

var vueltasTotales;
var selJ;
var usuariosActivos;

var cruzarJ1;
var cruzarJ2;

var controlJ1;
var controlJ2;

var inver;
var inver2;

var cong;
var cong2;

var debouncedEnvio = null;
var debouncedEnvio2 = null;

var musica = document.getElementById('miMusica');

var game = new Phaser.Game(config);

var ip = location.host
var connection = new WebSocket('ws://' + ip + '/echo');
connection.onopen = function () {
	console.log('Conexión WebSocket abierta con éxito');
	connection.send(JSON.stringify('¡Bienvenido/a a Virtual Velocity!'));
}
connection.onerror = function(e) {
	console.log("WS error: " + e);
}
connection.onmessage = function(msg) {
	console.log("WS message: " + msg.data);
}
connection.onclose = function() {
	console.log("WS conexion cerrada");
}

function preload ()
{
    //elememtos pista
    console.log("Cargando track...");
    this.load.image('sand', 'assets/arena.png');
    this.load.image('curva1', 'assets/curva1.png');
    this.load.image('curva2', 'assets/curva2.png');
    this.load.image('curva3', 'assets/curva3.png');
    this.load.image('curva4', 'assets/curva4.png');
    this.load.image('straight1', 'assets/carretera1.png');
    this.load.image('straight2', 'assets/carretera2.png');
    this.load.image('meta', 'assets/meta.png');
    this.load.image('ball', 'assets/pelota.png');
    this.load.image('ball2', 'assets/pelota2.png');
    this.load.image('ball3', 'assets/pelota3.png');
    this.load.image('puddle', 'assets/charco.png');
    this.load.image('mudpuddle', 'assets/charcobarro.png');
    this.load.image('betis', 'assets/toalla.png');
    this.load.image('towell', 'assets/toalla2.png');
    this.load.image('towell2', 'assets/toalla3.png');
    this.load.image('towell3', 'assets/toalla4.png');
    this.load.image('interface', 'assets/interfaz.png');
    this.load.image('box', 'assets/cajaPower.png');
    this.load.image('box2', 'assets/cajaVueltas.png');
    this.load.image('meme', 'assets/meme.png');

    //imágenes de victoria
    this.load.image('ganaJ1', 'assets/ganaJ1.png');
    this.load.image('ganaJ2', 'assets/ganaJ2.png');

    //Coche 1
    this.load.spritesheet('car1ver', 'assets/spritesheetvertical.png', { frameWidth: 28, frameHeight: 49 });
    this.load.spritesheet('car1hor', 'assets/spritesheethorizontal.png', { frameWidth: 49, frameHeight: 28 });
    this.load.spritesheet('car1dia', 'assets/spritesheetdiagonal.png', { frameWidth: 43, frameHeight: 45 });

    //Coche 2
    this.load.spritesheet('car2ver', 'assets/spritesheetvertical2.png', { frameWidth: 28, frameHeight: 49 });
    this.load.spritesheet('car2hor', 'assets/spritesheethorizontal2.png', { frameWidth: 49, frameHeight: 28 });
    this.load.spritesheet('car2dia', 'assets/spritesheetdiagonal2.png', { frameWidth: 43, frameHeight: 45 });
    
    //power-ups
    this.load.image('icCong', 'assets/pistolacongelacion.png');
    this.load.image('icTurb', 'assets/turbo.png');
    this.load.image('icInv', 'assets/inversion.png');
    
}

function create ()
{
    cruzarJ1 = 0;
    controlJ1 = true;

    cruzarJ2 = 0;
    controlJ2 = true;

    inver = false;
    inver2 = false;
    
    // if((vueltasTotales!=2) || (vueltasTotales!=3) || (vueltasTotales!=5) || (vueltasTotales!=7)){
    // vueltasTotales = 52;
    // }

    numVueltasJ1 = 0;
    numVueltasJ2 = 0;

    this.add.image(544, 390, 'ganaJ1').setScale(0.85, 1.07);
    J2Win = this.add.image(544, 390, 'ganaJ2').setScale(0.85, 1.07);

    back = this.physics.add.staticGroup();

    tracks = this.physics.add.staticGroup();  
    
    elements = this.physics.add.staticGroup();

    detection = this.physics.add.staticGroup();

    assets = this.physics.add.staticGroup();
    
    icons = this.physics.add.staticGroup();

    detection.create(192, 512, 'meta').setScale(0.6).refreshBody();
	
    //Circuito
    const trackData = [
    { x: 192, y: 256, type: 'straight1' },
    { x: 192, y: 128, type: 'curva2' },
    { x: 320, y: 128, type: 'straight2' },
    { x: 448, y: 128, type: 'straight2' },
    { x: 576, y: 128, type: 'straight2' },
    { x: 704, y: 128, type: 'curva1' },
    { x: 704, y: 256, type: 'curva3' },
    { x: 832, y: 256, type: 'straight2' },
    { x: 960, y: 256, type: 'curva1' },
    { x: 960, y: 384, type: 'straight1' },
    { x: 960, y: 512, type: 'straight1' },
    { x: 960, y: 640, type: 'curva4' },
    { x: 832, y: 640, type: 'straight2' },
    { x: 704, y: 640, type: 'curva3' },
    { x: 704, y: 512, type: 'curva1' },
    { x: 576, y: 512, type: 'straight2' },
    { x: 448, y: 512, type: 'curva2' },
    { x: 448, y: 640, type: 'curva4' },
    { x: 320, y: 640, type: 'straight2' },
    { x: 192, y: 640, type: 'curva3' },
    { x: 192, y: 512, type: 'straight1' },
    { x: 192, y: 384, type: 'straight1' }
	];

	trackData.forEach(data => {
    	tracks.create(data.x, data.y, data.type).setScale(0.4).refreshBody();
	});
    
    //Arena

    //Llena la pantalla con bloques de arena
    for (let row = 32; row < 1088; row += 64) {
		console.log('arena33');
        for (let col = 32; col < 768; col += 64) {
            let overlappingTrack = false;

            //Verifica si hay algún sprite de carretera en las coordenadas actuales
            tracks.children.iterate((track) => {
                if (track.getBounds().contains(row, col)) {
                    overlappingTrack = true;
                }
            });

            //Si no hay sprite de carretera en las coordenadas actuales, crea un bloque de arena
            if (!overlappingTrack) {
                back.create(row, col, 'sand');
            }
        }
    }

    elements.create(192, 256, 'meta').setScale(0.28).refreshBody();

    assets.create(750, 350, 'ball');
    assets.create(350, 520, 'ball2');
    assets.create(70, 700, 'ball3');
    assets.create(835, 135, 'puddle');
    assets.create(570, 650, 'mudpuddle');
    assets.create(544, 384, 'betis');
    assets.create(830, 520, 'towell');
    assets.create(64, 490, 'towell2');
    assets.create(300, 265, 'towell3');
    //assets.create(544, 384, 'interface');
    assets.create(60, 150, 'box');
    assets.create(60, 250, 'box');
    assets.create(60, 350, 'box');
    assets.create(136, 30, 'box2').setScale(3, 0.6);
    assets.create(948, 30, 'box2').setScale(3.1, 0.6);
    assets.create(560, 265, 'meme');
    
    //iconos power-up
    icTurb = icons.create(60, 150, 'icTurb');
	icInv = icons.create(60, 250, 'icInv');
	icCong = icons.create(60, 350, 'icCong');
    
    //Animaciones rectas coche 1

    this.anims.create({
        key: 'up',
        frames: [ { key: 'car1ver', frame: 0 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1ver')
    });

    this.anims.create({
        key: 'down',
        frames: [ { key: 'car1ver', frame: 1 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1ver')
    });
    this.anims.create({
        key: 'right',
        frames: [ { key: 'car1hor', frame: 0 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1hor')
    });

    this.anims.create({
        key: 'left',
        frames: [ { key: 'car1hor', frame: 1 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1hor')
    });

    //Anims DIAGONALES coche 1

    this.anims.create({
        key: 'rightup',
        frames: [ { key: 'car1dia', frame: 0 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1dia')
    });

    this.anims.create({
        key: 'rightdown',
        frames: [ { key: 'car1dia', frame: 1 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1dia')
    });

    this.anims.create({
        key: 'leftdown',
        frames: [ { key: 'car1dia', frame: 2 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1dia')
    });

    this.anims.create({
        key: 'leftup',
        frames: [ { key: 'car1dia', frame: 3 } ],
        frameRate: 20,
        J1 : this.physics.add.sprite('car1dia')
    });

    //Animaciones rectas coche 2

    this.anims.create({
        key: 'up2',
        frames: [ { key: 'car2ver', frame: 0 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2ver')
    });

    this.anims.create({
        key: 'down2',
        frames: [ { key: 'car2ver', frame: 1 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2ver')
    });
    this.anims.create({
        key: 'right2',
        frames: [ { key: 'car2hor', frame: 0 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2hor')
    });

    this.anims.create({
        key: 'left2',
        frames: [ { key: 'car2hor', frame: 1 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2hor')
    });

    //Anims DIAGONALES coche 2

    this.anims.create({
        key: 'rightup2',
        frames: [ { key: 'car2dia', frame: 0 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2dia')
    });

    this.anims.create({
        key: 'rightdown2',
        frames: [ { key: 'car2dia', frame: 1 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2dia')
    });

    this.anims.create({
        key: 'leftdown2',
        frames: [ { key: 'car2dia', frame: 2 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2dia')
    });

    this.anims.create({
        key: 'leftup2',
        frames: [ { key: 'car2dia', frame: 3 } ],
        frameRate: 20,
        J2 : this.physics.add.sprite('car2dia')
    });

    J1.fisicas = this.physics.add.sprite(220, 450, 'car1ver');

    J1.fisicas.setCollideWorldBounds(true);

    J2.fisicas = this.physics.add.sprite(165, 450, 'car2ver');

    J2.fisicas.setCollideWorldBounds(true);

    teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    teclaI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    teclaJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    teclaL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    teclaK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    
    if (selJ==1)
    {
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.I);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.J);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.K);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.L);
	}
	
	if (selJ==2)
    {
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

    //teclas power up inversión
    teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    teclaO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    //teclas power up congelación
    teclaR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    teclaP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    //teclas power up turbo
    teclaQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    teclaU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    
    //tecla chat
    teclaC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    teclaV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

    this.physics.add.collider(J1.fisicas, back);
    this.physics.add.collider(J2.fisicas, back);
    this.physics.add.collider(J1.fisicas, J2.fisicas);

    this.physics.add.overlap(J1.fisicas, elements, cambiarCruzarJ1, null, this);
    this.physics.add.overlap(J2.fisicas, elements, cambiarCruzarJ2, null, this);
    this.physics.add.overlap(J1.fisicas, detection, cambiarJ1, null, this);
    this.physics.add.overlap(J2.fisicas, detection, cambiarJ2, null, this);

    numVueltasJ1Text = this.add.text(24, 8, 'J1 Vueltas: 1/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
    numVueltasJ2Text = this.add.text(834, 10, 'J2 Vueltas: 1/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
    numVueltasJ1Text.setStyle(estilo1);
    numVueltasJ2Text.setStyle(estilo2);
    
    esperando = this.add.text(200, 250, 'ESPERANDO...', { fontSize: '100px', fill: '#000' });
    esperando.setStyle(estilo3);
    
    /*this.timedEventUpdateConnection = this.time.addEvent( {
		delay: 13,
		callback: this.enviarPosicionesAlServidor,
		callbackScoope: this,
		loop: true });*/
}

function update ()
{
    if (!gameOver && usuariosActivos > 1){
        if(!juegoPausado){

    //condiciones movimiento coche 1
    if(!J1.inver){
    controles(J1, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else{
        controles(J1, teclaS, teclaW, teclaD, teclaA,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    }
    
    //condiciones movimiento coche 2
    if(!J2.inver){
    controles(J2, teclaI, teclaK, teclaJ, teclaL,'leftup2','leftdown2','rightup2','rightdown2','left2','right2','up2','down2');
    } else {
        controles(J2, teclaK, teclaI, teclaL, teclaJ,'leftup2','leftdown2','rightup2','rightdown2','left2','right2','up2','down2');
    }

    if(teclaE.isDown && J1.numInver == 1){
        powerInversion(J2,J1);
    }

    if(teclaO.isDown && J2.numInver == 1){
        powerInversion(J1,J2);
    }

    if(teclaR.isDown && J1.numCong == 1){
        powerCongelacion(J2,J1);
    }

    if(teclaP.isDown && J2.numCong == 1){
        powerCongelacion(J1,J2);
    }

    if(teclaQ.isDown && J1.numTurb == 1){
        powerTurbo(J1);
    }

    if(teclaU.isDown && J2.numTurb == 1){
        powerTurbo(J2);
    }
    
    while(usuariosActivos < 2) {
    esperando.setText('ESPERANDO...');
    }
    
    if(usuariosActivos > 1) {
		esperando.setVisible(false);
	}
    
	//cargarMensajes();
    verificarFinJuego();
    document.addEventListener('keydown', function(event) {
   if (event.key === 'Escape') {
	   if(!juegoPausado && !chatActivo)
    		pausarJuego();
    		else if(event.key === 'Escape'){
		if(chatActivo)
			ocultarChat();
	}	
	} else if (event.key === 'c') {
    	if (!chatActivo) {
        	verChat();
    	}
	} 
	});
	
/*let colaDeActualizaciones = [];
let intervaloEnvio = null;

function procesarColaDeActualizaciones() {
    if (colaDeActualizaciones.length > 0) {

        colaDeActualizaciones.forEach(function(J) {
            enviarPosicionesAlServidor(J);
        });

        colaDeActualizaciones = [];
    }
}

 debouncedEnvio = setTimeout(function() {

    colaDeActualizaciones.push(J1);
    colaDeActualizaciones.push(J2);

    if (!intervaloEnvio) {
        intervaloEnvio = setInterval(procesarColaDeActualizaciones, 100); 
    }
},100);*/
   
        }
    }
}

game.loop.targetFps = 60;

function cambiarCruzarJ1(){
    cruzarJ1 += 1;
    if(cruzarJ1 == 1){
        numVueltasJ1 += 1;
        numVueltasJ1Text.setText('J1 Vueltas: ' + numVueltasJ1 + '/' + vueltasTotales); 
    }
}

function cambiarJ1(){
    cruzarJ1 = 0;
}

function cambiarCruzarJ2(){
    cruzarJ2 += 1;
    if(cruzarJ2 == 1){ 
        numVueltasJ2 += 1;
        numVueltasJ2Text.setText('J2 Vueltas:' + numVueltasJ2 + '/' + vueltasTotales); 
    }
}

function cambiarJ2(){
    cruzarJ2 = 0;
}

//función de los controles con jugador, teclas y animaciones
function controles(J, u, d, l, r,aniLU,aniLD,aniRU,aniRD,aniL,aniR,aniU,aniD){
	 /*const mensaje = {
        tipo: 'movimiento',
        jugador: J.nombre,  // Agregar el nombre del jugador al mensaje
        direccion: { izquierda: l.isDown, derecha: r.isDown, arriba: u.isDown, abajo: d.isDown },
        posicion: { x: J.fisicas.x, y: J.fisicas.y }
    };*/
    //console.log('entra2');
    //connection.send(JSON.stringify(mensaje));
	
    if(l.isDown && u.isDown)
    {
        J.fisicas.anims.play(aniLU, true);
        J.fisicas.setVelocityX(-J.velocidadD);
        J.fisicas.setVelocityY(-J.velocidadD);
        enviarPosicionesAlServidor(J);
    }
    else if(l.isDown && d.isDown)
    {
        J.fisicas.anims.play(aniLD, true);
        J.fisicas.setVelocityX(-J.velocidadD);
        J.fisicas.setVelocityY(J.velocidadD);
        enviarPosicionesAlServidor(J);
    }
    else if(r.isDown && u.isDown)
    {
        J.fisicas.anims.play(aniRU, true);
        J.fisicas.setVelocityX(J.velocidadD);
        J.fisicas.setVelocityY(-J.velocidadD);
        enviarPosicionesAlServidor(J);
        
    }
    else if(r.isDown && d.isDown)
    {
        J.fisicas.anims.play(aniRD, true);
        J.fisicas.setVelocityX(J.velocidadD);
        J.fisicas.setVelocityY(J.velocidadD);
        enviarPosicionesAlServidor(J);
    }
    else if (l.isDown)
    {
        J.fisicas.setVelocityY(0);
        J.fisicas.setVelocityX(-J.velocidad);
        //J1.angle = -45;
        J.fisicas.anims.play(aniL, true);
        enviarPosicionesAlServidor(J);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (r.isDown)
    {
        J.fisicas.setVelocityY(0);
        J.fisicas.setVelocityX(J.velocidad);
        //J1.angle = 45;
        J.fisicas.anims.play(aniR, true);
        enviarPosicionesAlServidor(J);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (u.isDown)
    {
        J.fisicas.setVelocityX(0);
        J.fisicas.setVelocityY(-J.velocidad);
        //J1.angle = 0;
        J.fisicas.anims.play(aniU, true);
        console.log(usuariosActivos);
        enviarPosicionesAlServidor(J);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else if (d.isDown)
    {
        J.fisicas.setVelocityX(0);
        J.fisicas.setVelocityY(J.velocidad);
        //J1.angle = 180;
        J.fisicas.anims.play(aniD, true);
        enviarPosicionesAlServidor(J);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else
    {
        J.fisicas.setVelocityX(0);
        //J1.angle = 0;
        J.fisicas.setVelocityY(0);
        //J1.angle = 0;
    } 
    
}

function verificarFinJuego() {
    if (numVueltasJ1 > vueltasTotales || numVueltasJ2 > vueltasTotales) {
        finalizarPartida()
    
        gameOver = true;
    }
}


function pausarJuego() {
    // Muestra el menú de pausa
    document.getElementById('pausa').style.display = 'block';
    juegoPausado = true;
}

function reanudarJuego() {  
    // Ocultar el menú de pausa
    document.getElementById('pausa').style.display = 'none';
    juegoPausado = false;
}

function verChat() {  
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('chat2').style.display = 'block';
    chatActivo = true;
    //juegoPausado = true;
}

function ocultarChat() { 
    document.getElementById('chat2').style.display = 'none';
    chatActivo = false;
    //juegoPausado = true;
}

function sonidoPower(ruta) {
    //elemento de audio
    var audio = new Audio(ruta);

    //reproducir el sonido
    audio.play();
}

function powerInversion(J, usu) {
    sonidoPower('assets/invertir.mp3');
    J.inver = true;
    usu.numInver = 0;
    icInv.setVisible(false);
    // Construir el mensaje de power-up
    //const mensajePowerUp = {
       // tipo: 'inversion',
        //jugador: miID,  // Asegúrate de tener un identificador único para el jugador
   // };

    // Enviar el mensaje al servidor a través del WebSocket
    //socket.send(JSON.stringify(mensajePowerUp));
    document.getElementById('mensajePelota').style.display = 'block';
	 setTimeout(function () {
            document.getElementById('mensajePelota').style.display = 'none';
        }, 3000);
    setTimeout(function() {
        noPowerInversion(J);
    }, 5000);
}

function noPowerInversion(Ju) {
    Ju.inver = false;
}

function powerCongelacion(J, usu){
    sonidoPower('assets/congelar.mp3');
    J.vel = 0;
    J.velD = 0;
    usu.numCong = 0;
    icCong.setVisible(false);
    setTimeout(function() {
        noPowerCongelacion(J);
    }, 5000);
}

function noPowerCongelacion(Ju) {
    Ju.vel = 100;
    Ju.velD = 75;
}

function powerTurbo(J){
    sonidoPower('assets/turbo.mp3');
    J.vel *= 1.5;
    J.velD *= 1.5;
    J.numTurb = 0;
    icTurb.setVisible(false);
    setTimeout(function() {
        noPowerTurbo(J);
    }, 5000);
}

function noPowerTurbo(Ju) {
    Ju.vel /= 1.5;
    Ju.velD /= 1.5;
}

function finalizarPartida() {
    // Ocultar elementos existentes
    J1.fisicas.visible = false;
    J2.fisicas.visible = false;
    tracks.clear(true, true);
    elements.clear(true, true);  
    back.clear(true, true);      
    detection.clear(true, true);
    assets.clear(true, true);
    icons.clear(true, true);
    numVueltasJ1Text.setVisible(false);
    numVueltasJ2Text.setVisible(false);
    ocultarChat();
    reanudarJuego();
    document.getElementById('chat-container').style.display = 'none';
    sonidoPower('assets/final.mp3')
    if(numVueltasJ1 > vueltasTotales){
        J2Win.setVisible(false);
    }

    //timer para ir al menú
    setTimeout(function() {
        window.location.href = 'Index.html';
    }, 5000); 
}

function enviarPosicionesAlServidor(J) {
    const mensaje = {
        tipo: 'posicion',
        jugador: J.nombre,
        posicion: { x: J.fisicas.x, y: J.fisicas.y },
        velocidad: { velX: J.fisicas.body.velocity.x, velY: J.fisicas.body.velocity.y },
        animacion: { currentAnim: J.fisicas.anims.currentAnim },
        ganada: gameOver,
        usuarios: usuariosActivos
        //animacion: {anim: J.fisicas.anims}
    };
    
    connection.send(JSON.stringify(mensaje));
}

connection.onmessage = function (msg) {
    var mensaje = JSON.parse(msg.data);
    actualizarPosicionJugador(mensaje);
            //controles(mensaje.jugador, teclaW, teclaS, teclaA, teclaD, mensaje.animacion,mensaje.animacion,mensaje.animacion,mensaje.animacion,mensaje.animacion,mensaje.animacion,mensaje.animacion,mensaje.animacion)
          
}

function actualizarPosicionJugador(msg) {
		if (msg.jugador === 'J1' && J1.fisicas) {
	        J1.fisicas.setPosition(msg.posicion.x, msg.posicion.y);
	        J1.fisicas.setVelocity(msg.velocidad.velX, msg.velocidad.velY);  // Ajustamos aquí para establecer ambas velocidades
	        J1.fisicas.anims.play(msg.animacion.currentAnim || 'up', true); // Si no hay animación, reproducir una predeterminada
	    } else if (msg.jugador === 'J2' && J2.fisicas) {
	        J2.fisicas.setPosition(msg.posicion.x, msg.posicion.y);
	        J2.fisicas.setVelocity(msg.velocidad.velX, msg.velocidad.velY);
	        J2.fisicas.anims.play(msg.animacion.currentAnim || 'up2', true);
	    }
	    gameOver = msg.ganada;
	    if (msg.usuarios>1)
	    	usuariosActivos = msg.usuarios;
}


document.addEventListener('keydown', function (event) {
    //Detener la propagación del evento si el chat está activo
    if (chatActivo) {
        event.stopPropagation();
    }
});

/*connection.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    if (data.tipo === 'movimiento') {
        // Actualizar el movimiento del coche en el juego
        actualizarMovimiento(data);
    } else {
        // Otro tipo de mensajes si es necesario
    }
};

function actualizarMovimiento(data) {
    // Obtener la dirección del movimiento del mensaje
    const direccion = data.direccion;

    // Obtener el jugador del mensaje
    const jugador = data.jugador;

    // Obtener el objeto del jugador correspondiente
    let jugadorObj;
    if (jugador === 'J1') {
        jugadorObj = J1;
    } else if (jugador === 'J2') {
        jugadorObj = J2;
    } else {
        jugadorObj = J1;
    }

    // Actualizar la posición del jugador en el juego según la dirección del mensaje
    if (direccion.izquierda && direccion.arriba) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.izquierda && direccion.abajo) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.derecha && direccion.arriba) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.derecha && direccion.abajo) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.izquierda) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.derecha) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.arriba) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else if (direccion.abajo) {
        controles(jugadorObj, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else {
        // Si no hay ninguna dirección, detener el movimiento del jugador
        jugadorObj.fisicas.setVelocity(0, 0);
    }
}*/
//});