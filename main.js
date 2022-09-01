console.log('linked')
// ====================== Game Flow ======================= //
// Clear the canvas => shrek alive? => render shrek, check for collision => render donkey
// ====================== Global DOM / Variables ======================= //
let movement = document.getElementById('movement')
let game = document.getElementById('game')
let score = document.getElementById('score')
let gameStatus = document.getElementById('status')
let shrek
let donkey
// ====================== SETUP FOR CANVAS RENDERING ======================= //
const ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])
// ====================== ENTITIES ======================= //
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y =y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true

        this.render = function() {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            let rec = ctx.fillRect(this.x, this.y, this.width, this.height)
            let rec2 = ctx.fillRect(this.x-this.width, this.y, this.width, this.height)
            let rec3 = ctx.fillRect(this.x-this.width*2, this.y, this.width, this.height)


        }
        this.move = function() {
            this.x += 10
        }

       
    }
}
// ====================== HELPER FUNCTIONS ======================= //
//  KEYBOARD INTERACTION LOGIC
const movementHandler = (e) => {
    console.log(`movement: ${e.key}`)
    switch(e.key) {
        case 'ArrowUp':
            donkey.y > 0 ? donkey.y -= 10 : null
            break
        case 'ArrowDown':
            donkey.y < game.height - donkey.height ? donkey.y += 10 : null
            break
        case 'ArrowLeft':
            donkey.x > 0 ? donkey.x -= 10 : null
            break
        case 'ArrowRight':
            donkey.x < game.width - donkey.width ? donkey.x += 10 : null
          
            break
    }
    console.log(donkey)
}


function addNewShrek() {
    shrek.alive = false;
    setTimeout(function () {
      let x = Math.floor(Math.random() * game.width) - 40;
      let y = Math.floor(Math.random() * game.height) - 80;
      shrek = new Crawler(x, y, "#bada55", 40, 80);
      gameStatus.textContent = 'keep playing'
      
    }, 1000);
    return true;
  }


function detectHit(p1, p2) {
    // console.log(p1.y + p1.height > p2.y);
    // console.log(p1.y < p2.y + p2.height);
    // console.log(p1.x + p1.width > p2.x);
    // console.log(p1.x < p2.x + p2.width);
  
    let hitTest =
      p1.y + p1.height > p2.y &&
      p1.y < p2.y + p2.height &&
      p1.x + p1.width > p2.x &&
      p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit
  
    if (hitTest) {
      // add 100 points
      console.log("hit");
      let newScore = Number(score.textContent) + 100;
      score.textContent = newScore;
      gameStatus.textContent = 'Shrek is outta here!!'
      addNewShrek();
    } else {
      return false;
    }
  }




// ====================== GAME PROCESSES ======================= //
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = `X: ${donkey.x}\nY: ${donkey.y}`
   if (shrek.alive ) {
    shrek.render() 
     detectHit(donkey, shrek)
}
    donkey.render()
    // donkey.move()
   
}
// ====================== PAINT INITIAL SCREEN ======================= //
// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function(e) {
    donkey = new Crawler(10, 20, '#00ff00', 20, 20)
    shrek = new Crawler(100, 100, '#ff0000', 40, 80)
    const runGame = this.setInterval(gameLoop, 120)
})
document.addEventListener('keydown', movementHandler)
