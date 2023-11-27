var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
var track;
var gameOver = false;
var cursorJ1;
var cursorJ2;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    console.log("Cargando track...");
    this.load.image('track', 'assets/carretera.png');
    this.load.image('car1', 'assets/Coche1.png');
 
}

function create ()
{
    this.add.image(400, 300, 'sky').setScale(2.5);

    track = this.physics.add.staticGroup();

    track.create(550, 420, 'track').setScale(2.5);

    J1 = this.physics.add.sprite(75, 450, 'car1');
    J1.setGravityY(0);
    J1.setScale(0.25);

    J1.setBounce(0.2);
    J1.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(J1, track);
}

function update ()
{
    if (cursors.left.isDown)
        {
            J1.setVelocityX(-160);

            J1.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            J1.setVelocityX(160);

            J1.anims.play('right', true);
        }
        else
        {
            J1.setVelocityX(0);

            J1.anims.play('turn');
        }
}
