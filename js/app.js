//I have decided that I'm going to make a Character class on which both the enemies and the players are based, since both of their share a lot of the same functionality
class Character{
    constructor(x = 100, y = 100, src){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = src;
    }

    render(){
        ctx.drawImage(this.sprite, this.x, this.y);//I ditched the Resources.get method because I thought this way would be a lot simpler.
    }

  
}
// Enemies our player must avoid

class Enemy extends Character{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, src){
        super(x, y, src);
        this.speed = Math.random() * 250;        
    }

    update(dt){
         // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x < 500){        
            this.x += this.speed * dt;
        }else{
            this.x = -100;
    }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character{
    constructor(x, y, src){
        super(x, y, src);
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

    checkCollision(){
        //First row: bug.y = 60 and player.y = 40
        //Second row: player.y = 125
        //Third row: player.y = 210
        //i is the index of the player on a row f(i) = 40 + (85 * i)


        //Looping through all the enemies and seeing if the player is bumping into any of them
        for(let bug of allEnemies){
            let bugX = Math.ceil(bug.x) + 60;            

            if(bugX >= this.x && bugX <= this.x + 100 && bug.y === this.y + 20){
                return true;
            }
        }

        return false;
    }

    update(){
        if(this.checkCollision()){
            this.x = 200;
            this.y = 295; 
        }  

        //If the player is at the water
        if(this.y === -45){
            setTimeout( () => {
                alert("You made it!");
                this.x = 200;
                this.y = 295; 
            }, 10);
        } 
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 295, "images/char-cat-girl.png");

for(let i = 0; i < 3; i++){
    let bug = new Enemy(-100, 60 + (85 * i), "images/enemy-bug.png");
    allEnemies.push(bug);
}



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
