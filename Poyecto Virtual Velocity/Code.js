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
var cursorJ1;
var cursorJ2;
var tracks;
var platforms;

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
    
    //platforms = this.physics.add.staticGroup();

    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

    //this.physics.add.image(550, 420, 'track').setScale(1.5);

    J1 = this.physics.add.sprite(220, 450, 'car1').setScale(0.25).refreshBody();

    J1.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(J1, back);
    this.physics.add.collider(J1, platforms);
}

function update ()
{
    if (cursors.left.isDown)
        {
            J1.setVelocityX(-100);
        }
        else if (cursors.right.isDown)
        {
            J1.setVelocityX(100);
        }
        else
        {
            J1.setVelocityX(0);
        }

    if (cursors.up.isDown)
        {
            J1.setVelocityY(-100);
        }
        else if (cursors.down.isDown)
        {
            J1.setVelocityY(100);
        }
        else
        {
            J1.setVelocityY(0);
        }
        
    
}
