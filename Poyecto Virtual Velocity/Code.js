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
        update: update
    }
};

var J1;
var J2;
var back;
var gameOver = false;

var tracks;
var elements;
var detection;

var teclaW;
var teclaA;
var teclaD;
var teclaS;

var teclaI;
var teclaJ;
var teclaL;
var teclaK;

var numVueltasJ1; 
var numVueltasJ2;

var numVueltasJ1Text; 
var numVueltasJ2Text;

var vueltasTotales;

var cruzarJ1;
var cruzarJ2;

var controlJ1;
var controlJ2;

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
    cruzarJ1 = 0;
    controlJ1 = true;

    cruzarJ2 = 0;
    controlJ2 = true;

    vueltasTotales = 5;
    numVueltasJ1 = 1;
    numVueltasJ2 = 1;
    // Carretera 128
    // Arena 64
    back = this.physics.add.staticGroup();

    tracks = this.physics.add.staticGroup();  
    
    elements = this.physics.add.staticGroup();

    detection = this.physics.add.staticGroup();
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

    elements.create(192, 256, 'meta').setScale(0.2).refreshBody();
    detection.create(192, 512, 'meta').setScale(0.6).refreshBody();
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

    J1 = this.physics.add.sprite(220, 450, 'car1ver');

    J1.setCollideWorldBounds(true);

    J2 = this.physics.add.sprite(165, 450, 'car2ver');

    J2.setCollideWorldBounds(true);

    //cursors = this.input.keyboard.createCursorKeys();

    teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    teclaI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    teclaJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    teclaL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    teclaK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    this.physics.add.collider(J1, back);
    this.physics.add.collider(J2, back);
    this.physics.add.collider(J1, J2);

    this.physics.add.overlap(J1, elements, cambiarCruzarJ1, null, this);
    this.physics.add.overlap(J2, elements, cambiarCruzarJ2, null, this);
    this.physics.add.overlap(J1, detection, cambiarJ1, null, this);
    this.physics.add.overlap(J2, detection, cambiarJ2, null, this);

    numVueltasJ1Text = this.add.text(16, 16, 'J1 Vueltas:'+ numVueltasJ1 + '/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
    numVueltasJ2Text = this.add.text(800, 16, 'J2 Vueltas:' + numVueltasJ2 + '/' + vueltasTotales, { fontSize: '32px', fill: '#000' });
}

function update ()
{
    //if(controlJ1 == true){
        
    //}
    if(cruzarJ1 == 1){
        //sumarVueltaJ1(); 
        //setTimeout(cambiarJ1, 5000);
        numVueltasJ1 += 1;
        numVueltasJ1Text.setText('J1 Vueltas:' + numVueltasJ1 + '/' + vueltasTotales); 
    }
    //if(controlJ2 ==true){
        
    //}
    if(cruzarJ2 == 1){
        //sumarVueltaJ2(); 
        //setTimeout(cambiarJ2, 5000); 
        numVueltasJ2 += 1;
        numVueltasJ2Text.setText('J2 Vueltas:' + numVueltasJ2 + '/' + vueltasTotales); 
    }
    // if(cruzarJ1){
    //     sumarVueltaJ1();  
    // }
    //condiciones movimiento coche 1
    if(teclaA.isDown && teclaW.isDown)
    {
        J1.anims.play('leftup', true);
        J1.setVelocityX(-75);
        J1.setVelocityY(-75);
    }
    else if(teclaA.isDown && teclaS.isDown)
    {
        J1.anims.play('leftdown', true);
        J1.setVelocityX(-75);
        J1.setVelocityY(75);
    }
    else if(teclaD.isDown && teclaW.isDown)
    {
        J1.anims.play('rightup', true);

        J1.setVelocityX(75);
        J1.setVelocityY(-75);
        
    }
    else if(teclaD.isDown && teclaS.isDown)
    {
        J1.anims.play('rightdown', true);
        J1.setVelocityX(75);
        J1.setVelocityY(75);
    }
    else if (teclaA.isDown)
    {
        J1.setVelocityY(0);
        J1.setVelocityX(-100);
        //J1.angle = -45;
        J1.anims.play('left', true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (teclaD.isDown)
    {
        J1.setVelocityY(0);
        J1.setVelocityX(100);
        //J1.angle = 45;
        J1.anims.play('right', true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (teclaW.isDown)
    {
        J1.setVelocityX(0);
        J1.setVelocityY(-100);
        //J1.angle = 0;
        J1.anims.play('up', true);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else if (teclaS.isDown)
    {
        J1.setVelocityX(0);
        J1.setVelocityY(100);
        //J1.angle = 180;
        J1.anims.play('down', true);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else
    {
        J1.setVelocityX(0);
        //J1.angle = 0;
        J1.setVelocityY(0);
        //J1.angle = 0;
    } 

    //condiciones movimiento coche 2
    if(teclaJ.isDown && teclaI.isDown)
    {
        J2.anims.play('leftup2', true);
        J2.setVelocityX(-75);
        J2.setVelocityY(-75);
    }
    else if(teclaJ.isDown && teclaK.isDown)
    {
        J2.anims.play('leftdown2', true);
        J2.setVelocityX(-75);
        J2.setVelocityY(75);
    }
    else if(teclaL.isDown && teclaI.isDown)
    {
        J2.anims.play('rightup2', true);
        J2.setVelocityX(75);
        J2.setVelocityY(-75);
        
    }
    else if(teclaL.isDown && teclaK.isDown)
    {
        J2.anims.play('rightdown2', true);
        J2.setVelocityX(75);
        J2.setVelocityY(75);
    }
    else if (teclaJ.isDown)
    {
        J2.setVelocityY(0);
        J2.setVelocityX(-100);
        //J1.angle = -45;
        J2.anims.play('left2', true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (teclaL.isDown)
    {
        J2.setVelocityY(0);
        J2.setVelocityX(100);
        //J1.angle = 45;
        J2.anims.play('right2', true);
        //J1 = this.physics.add.sprite('car1hor');
    }
    else if (teclaI.isDown)
    {
        J2.setVelocityX(0);
        J2.setVelocityY(-100);
        //J1.angle = 0;
        J2.anims.play('up2', true);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else if (teclaK.isDown)
    {
        J2.setVelocityX(0);
        J2.setVelocityY(100);
        //J1.angle = 180;
        J2.anims.play('down2', true);
        //J1 = this.physics.add.sprite('car1ver');
    }
    else
    {
        J2.setVelocityX(0);
        //J1.angle = 0;
        J2.setVelocityY(0);
        //J1.angle = 0;
    } 

}

function sumarVueltaJ1(){
    //numVueltasJ1++;
    //numVueltasJ1Text.setText('J1 Vueltas:' + numVueltasJ1 + '/' + vueltasTotales);
    //cruzarJ1 = false;
    //setTimeout(cambiarCruzarJ1, 5000);
    //controlJ1 = false;
    console.log('sumar');
}
function sumarVueltaJ2(){
    numVueltasJ2++;
    numVueltasJ2Text.setText('J2 Vueltas:' + numVueltasJ2 + '/' + vueltasTotales);
    cruzarJ2 = false;
    setTimeout(cambiarCruzarJ2, 5000);
    controlJ2 = false;
    console.log('sumar');
}

function cambiarCruzarJ1(){
    console.log('cambiar');
    cruzarJ1 += 1;
}

function cambiarJ1(){
    console.log('cambiar');
    cruzarJ1 = 0;
}

function cambiarCruzarJ2(){
    console.log('cambiar');
    cruzarJ2 += 1;
}

function cambiarJ2(){
    console.log('cambiar');
    cruzarJ2 = 0;
}
