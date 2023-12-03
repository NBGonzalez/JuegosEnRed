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
    }
    get velocidad(){
        return this.vel;
    }
    get velocidadD(){
        return this.velD;
    }
}

var J1 = new Jugador(100, 75);
var J2 = new Jugador(100, 75);

// var velD;
// var vel;

var back;
var gameOver = false;
var juegoPausado = false;
var J2Win;

var tracks;
var elements;
var detection;
var assets;

var teclaW;
var teclaA;
var teclaD;
var teclaS;

var teclaI;
var teclaJ;
var teclaL;
var teclaK;

var teclaE;

var numVueltasJ1; 
var numVueltasJ2;

var numVueltasJ1Text; 
var numVueltasJ2Text;

var vueltasTotales;

var cruzarJ1;
var cruzarJ2;

var controlJ1;
var controlJ2;

var inver;
var inver2;

var cong;
var cong2;

var game = new Phaser.Game(config);

function preload ()
{
    //elememtos pista
    console.log("Cargando track...");
    //this.load.image('car1', 'assets/Coche1.png');
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

    // Agrega esto en la función preload antes de cargar otras imágenes
    this.load.image('ganaJ1', 'assets/ganaJ1.png');
    this.load.image('ganaJ2', 'assets/ganaJ2.png');

    //powers
    this.load.image('inv', 'assets/inversion.png');
    this.load.image('inv2', 'assets/inversion2.png');

    //Coche 1
    this.load.spritesheet('car1ver', 'assets/spritesheetvertical.png', { frameWidth: 28, frameHeight: 49 });
    this.load.spritesheet('car1hor', 'assets/spritesheethorizontal.png', { frameWidth: 49, frameHeight: 28 });
    this.load.spritesheet('car1dia', 'assets/spritesheetdiagonal.png', { frameWidth: 43, frameHeight: 45 });

    //Coche 2
    this.load.spritesheet('car2ver', 'assets/spritesheetvertical2.png', { frameWidth: 28, frameHeight: 49 });
    this.load.spritesheet('car2hor', 'assets/spritesheethorizontal2.png', { frameWidth: 49, frameHeight: 28 });
    this.load.spritesheet('car2dia', 'assets/spritesheetdiagonal2.png', { frameWidth: 43, frameHeight: 45 });
}

function create ()
{
    // vel = 100;
    // velD = 75;

    cruzarJ1 = 0;
    controlJ1 = true;

    cruzarJ2 = 0;
    controlJ2 = true;

    inver = false;
    inver2 = false;

    if(vueltasTotales == undefined){
    vueltasTotales = 3;
    }
    numVueltasJ1 = 0;
    numVueltasJ2 = 0;
    // Carretera 128
    // Arena 64


    this.add.image(544, 390, 'ganaJ1').setScale(0.85, 1.07);
    J2Win = this.add.image(544, 390, 'ganaJ2').setScale(0.85, 1.07);

    back = this.physics.add.staticGroup();

    tracks = this.physics.add.staticGroup();  
    
    elements = this.physics.add.staticGroup();

    detection = this.physics.add.staticGroup();

    assets = this.physics.add.staticGroup();

    detection.create(192, 512, 'meta').setScale(0.6).refreshBody();

    //Circuito
    tracks.create(192, 256, 'straight1').setScale(0.4).refreshBody;
    tracks.create(192, 128, 'curva2').setScale(0.4).refreshBody;
    tracks.create(320, 128, 'straight2').setScale(0.4).refreshBody;
    tracks.create(448, 128, 'straight2').setScale(0.4).refreshBody;
    tracks.create(576, 128, 'straight2').setScale(0.4).refreshBody;
    tracks.create(704, 128, 'curva1').setScale(0.4).refreshBody;
    tracks.create(704, 256, 'curva3').setScale(0.4).refreshBody;
    tracks.create(832, 256, 'straight2').setScale(0.4).refreshBody;
    tracks.create(960, 256, 'curva1').setScale(0.4).refreshBody;
    tracks.create(960, 384, 'straight1').setScale(0.4).refreshBody;
    tracks.create(960, 512, 'straight1').setScale(0.4).refreshBody;
    tracks.create(960, 640, 'curva4').setScale(0.4).refreshBody;
    tracks.create(832, 640, 'straight2').setScale(0.4).refreshBody;
    tracks.create(704, 640, 'curva3').setScale(0.4).refreshBody;
    tracks.create(704, 512, 'curva1').setScale(0.4).refreshBody;
    tracks.create(576, 512, 'straight2').setScale(0.4).refreshBody;
    tracks.create(448, 512, 'curva2').setScale(0.4).refreshBody;
    tracks.create(448, 640, 'curva4').setScale(0.4).refreshBody;
    tracks.create(320, 640, 'straight2').setScale(0.4).refreshBody;
    tracks.create(192, 640, 'curva3').setScale(0.4).refreshBody;
    tracks.create(192, 512, 'straight1').setScale(0.4).refreshBody;
    tracks.create(192, 384, 'straight1').setScale(0.4).refreshBody;
    
    //Arena

    //Llena la pantalla con bloques de arena
    for (let row = 32; row < 1088; row += 64) {
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
    assets.create(300, 250, 'ball3');
    assets.create(835, 135, 'puddle');
    assets.create(570, 650, 'mudpuddle');

    //this.add.image(64, 700, 'inv').setScale(0.2);
    
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
    
    //platforms = this.physics.add.staticGroup();

    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

    //this.physics.add.image(550, 420, 'track').setScale(1.5);

    J1.fisicas = this.physics.add.sprite(220, 450, 'car1ver');

    J1.fisicas.setCollideWorldBounds(true);

    J2.fisicas = this.physics.add.sprite(165, 450, 'car2ver');

    J2.fisicas.setCollideWorldBounds(true);

    //cursors = this.input.keyboard.createCursorKeys();

    teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    teclaI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    teclaJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    teclaL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    teclaK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    //teclas power up inversión
    teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    teclaO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    //teclas power up congelación
    teclaR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    teclaP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    //teclas power up turbo
    teclaT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    teclaU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

    this.physics.add.collider(J1.fisicas, back);
    this.physics.add.collider(J2.fisicas, back);
    this.physics.add.collider(J1.fisicas, J2.fisicas);

    this.physics.add.overlap(J1.fisicas, elements, cambiarCruzarJ1, null, this);
    this.physics.add.overlap(J2.fisicas, elements, cambiarCruzarJ2, null, this);
    this.physics.add.overlap(J1.fisicas, detection, cambiarJ1, null, this);
    this.physics.add.overlap(J2.fisicas, detection, cambiarJ2, null, this);

    numVueltasJ1Text = this.add.text(16, 16, 'J1 Vueltas: 1/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
    numVueltasJ2Text = this.add.text(800, 16, 'J2 Vueltas: 1/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
}

function update ()
{
    //if(controlJ1 == true){
        
    //}
    // if(cruzarJ1 == 1){
    //     //sumarVueltaJ1(); 
    //     //setTimeout(cambiarJ1, 5000);
    //     numVueltasJ1 += 1;
    //     numVueltasJ1Text.setText('J1 Vueltas:' + numVueltasJ1 + '/' + vueltasTotales); 
    // }
    //if(controlJ2 ==true){
        
    //}
    // if(cruzarJ2 == 1){
    //     //sumarVueltaJ2(); 
    //     //setTimeout(cambiarJ2, 5000); 
    //     numVueltasJ2 += 1;
    //     numVueltasJ2Text.setText('J2 Vueltas:' + numVueltasJ2 + '/' + vueltasTotales); 
    // }
    // if(cruzarJ1){
    //     sumarVueltaJ1();  
    // }
    if (!gameOver){
        if(!juegoPausado){
    //condiciones movimiento coche 1
    if(!J1.inver){
    controles(J1, teclaW, teclaS, teclaA, teclaD,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    } else{
        controles(J1, teclaS, teclaW, teclaD, teclaA,'leftup','leftdown','rightup','rightdown','left','right','up','down');
    }
    
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

    if(teclaT.isDown && J1.numTurb == 1){
        powerTurbo(J1);
    }

    if(teclaU.isDown && J2.numTurb == 1){
        powerTurbo(J2);
    }

    verificarFinJuego();
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            pausarJuego();
        }
    });
        }
    }

}

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
    if(l.isDown && u.isDown)
    {
        J.fisicas.anims.play(aniLU, true);
        J.fisicas.setVelocityX(-J.velocidadD);
        J.fisicas.setVelocityY(-J.velocidadD);
    }
    else if(l.isDown && d.isDown)
    {
        J.fisicas.anims.play(aniLD, true);
        J.fisicas.setVelocityX(-J.velocidadD);
        J.fisicas.setVelocityY(J.velocidadD);
    }
    else if(r.isDown && u.isDown)
    {
        J.fisicas.anims.play(aniRU, true);
        J.fisicas.setVelocityX(J.velocidadD);
        J.fisicas.setVelocityY(-J.velocidadD);
        
    }
    else if(r.isDown && d.isDown)
    {
        J.fisicas.anims.play(aniRD, true);
        J.fisicas.setVelocityX(J.velocidadD);
        J.fisicas.setVelocityY(J.velocidadD);
    }
    else if (l.isDown)
    {
        J.fisicas.setVelocityY(0);
        J.fisicas.setVelocityX(-J.velocidad);
        //J1.angle = -45;
        J.fisicas.anims.play(aniL, true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (r.isDown)
    {
        J.fisicas.setVelocityY(0);
        J.fisicas.setVelocityX(J.velocidad);
        //J1.angle = 45;
        J.fisicas.anims.play(aniR, true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (u.isDown)
    {
        J.fisicas.setVelocityX(0);
        J.fisicas.setVelocityY(-J.velocidad);
        //J1.angle = 0;
        J.fisicas.anims.play(aniU, true);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else if (d.isDown)
    {
        J.fisicas.setVelocityX(0);
        J.fisicas.setVelocityY(J.velocidad);
        //J1.angle = 180;
        J.fisicas.anims.play(aniD, true);
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

        //window.location.href = 'Index.html';
    }
}


function pausarJuego() {
    // Pausar la lógica del juego aquí (detener animaciones, temporizadores, etc.)
    
    // Muestra el menú de pausa
    document.getElementById('pausa').style.display = 'block';
    juegoPausado = true;
}

function reanudarJuego() {
    // Reanudar la lógica del juego aquí
    
    // Ocultar el menú de pausa
    document.getElementById('pausa').style.display = 'none';
    juegoPausado = false;
}

// function powerInversionJ1(){
//     J2.inver = true;
//     setTimeout(noPowerInversionJ1, 5000);
// }

function sonidoPower(ruta) {
    //Crear un elemento de audio
    var audio = new Audio(ruta);

    //Reproducir el sonido
    audio.play();
}

function powerInversion(J, usu) {
    J.inver = true;
    usu.numInver = 0;
    setTimeout(function() {
        noPowerInversion(J);
    }, 5000);
}

function noPowerInversion(Ju) {
    Ju.inver = false;
    //this.add.image(64, 700, 'inv2').setScale(0.2);
}

// function powerInversionJ2(){
//     inver = true;
//     setTimeout(noPowerInversionJ2, 5000);
// }

// function noPowerInversionJ2(){
//     inver = false;
//     //this.add.image(64, 700, 'inv2').setScale(0.2);
// }

function powerCongelacion(J, usu){
    sonidoPower('assets/congelar.mp3');
    J.vel = 0;
    J.velD = 0;
    usu.numCong = 0;
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
    if(numVueltasJ1 > vueltasTotales){
        J2Win.setVisible(false);
    }

    // Mostrar la imagen de fondo para el final del juego
    //this.add.image(550, 440, 'ganaJ1');

    setTimeout(function() {
        window.location.href = 'Index.html';
    }, 5000); 
}