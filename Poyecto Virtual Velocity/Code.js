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
var platforms;

var teclaW;
var teclaA;
var teclaD;
var teclaS;

var teclaI;
var teclaJ;
var teclaL;
var teclaK;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    console.log("Cargando track...");
    this.load.image('track', 'assets/carretera.png');
    this.load.image('car1', 'assets/Coche1.png');
    this.load.image('track2', 'assets/circuitoprueba.png');
    this.load.image('sand', 'assets/arena.png');
    this.load.image('curva1', 'assets/curva1.png');
    this.load.image('curva2', 'assets/curva2.png');
    this.load.image('curva3', 'assets/curva3.png');
    this.load.image('curva4', 'assets/curva4.png');
    this.load.image('straight1', 'assets/carretera1.png');
    this.load.image('straight2', 'assets/carretera2.png');

    // Coche 1
    this.load.spritesheet('car1ver', 'assets/spritesheetvertical.png', { frameWidth: 28, frameHeight: 49 });
    this.load.spritesheet('car1hor', 'assets/spritesheethorizontal.png', { frameWidth: 49, frameHeight: 28 });
    this.load.spritesheet('car1dia', 'assets/spritesheetdiagonal.png', { frameWidth: 43, frameHeight: 45 });
}

function create ()
{
    // Carretera 128
    // Arena 64
    back = this.physics.add.staticGroup();

    tracks = this.physics.add.staticGroup();

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

    for(var i = 32; i<768; i+=64){
        back.create(32, i, 'sand');
    }
    
    for(var i = 32; i<768; i+=64){
        back.create(96, i, 'sand');
    }

    for(var i = 160; i<768; i+=64){
        back.create(i, 32, 'sand');
    }

    for(var i = 160; i<768; i+=64){
        back.create(i, 32, 'sand');
    }

    for(var i = 800; i<=928; i+=64){
        back.create(i, 32, 'sand');
    }
    back.create(800, 96, 'sand');
    back.create(800, 160, 'sand');


    //Animaciones

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

    //Anims DIAGONALES

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
    
    //platforms = this.physics.add.staticGroup();

    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

    //this.physics.add.image(550, 420, 'track').setScale(1.5);

    J1 = this.physics.add.sprite(220, 450, 'car1ver');

    J1.setCollideWorldBounds(true);

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
    this.physics.add.collider(J1, platforms);
}

function update ()
{
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
}
