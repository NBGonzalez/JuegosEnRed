var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

var car1;
var car2;
var gameOver = false;
var cursorJ1;
var cursorJ2;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('track', 'assets/carretera.png');
}

function create ()
{
    this.add.image(400, 300, 'track');

    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{

}