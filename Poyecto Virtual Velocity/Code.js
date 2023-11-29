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
    this.load.image('curvleftup', 'assets/subidaizq.png');
    this.load.image('curvrightup', 'assets/subidader.png');
    this.load.image('curvleftdown', 'assets/bajadaizq.png');
    this.load.image('curvrightdown', 'assets/bajadader.png');
    this.load.image('straight', 'assets/recta.png');
}

function create ()
{
    back = this.physics.add.staticGroup();

    tracks = this.physics.add.staticGroup();

    tracks.create(500, 700, 'straight');
    back.create(635, 775, 'sand');
    //platforms = this.physics.add.staticGroup();

    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

    //this.physics.add.image(550, 420, 'track').setScale(1.5);

    J1 = this.physics.add.sprite(220, 450, 'car1').setScale(0.5).refreshBody();

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
