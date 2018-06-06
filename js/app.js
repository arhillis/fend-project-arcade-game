//I have decided that I'm going to make a Character class on which both the enemies and the players are based, since both of their share a lot of the same functionality
class Character{
    constructor(x = 100, y = 100, src = 'images/char-boy.png'){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = src;
    }

    handleInput(keyCode){
        switch(keyCode){
            case 'up':
                this.y -= (this.y > 0) ? 85 : 0;
                break;
            case 'down':
                this.y += (this.y < 300) ? 85 : 0;
                break;
            case 'right':
                this.x += (this.x < 400) ? 100 : 0;
                break;
            default:
                this.x -= (this.x > 0) ? 100 : 0;
        }
    }

    update(){
        console.log(this.x);
    }

    render(){
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character{
    constructor(x, y, src){
        super(x, y, src);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(100, 125, "images/char-cat-girl.png");

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
