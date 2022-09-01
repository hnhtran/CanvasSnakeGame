console.log('linked')
// ====================== Game Flow ======================= //
// Clear the canvas => shrek alive? => render shrek, check for collision => render donkey
// ====================== Global DOM / Variables ======================= //
let movement = document.getElementById('movement')
let game = document.getElementById('game')
let score = document.getElementById('score')
let gameStatus = document.getElementById('status')
let target
let snake
// ====================== SETUP FOR CANVAS RENDERING ======================= //
const ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])
// ====================== ENTITIES ======================= //
class Snake {
    constructor(x, y, color, width, height, step,changeX,changeY) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.step = step
        let array = [
            [x, y],
            [x - this.width, y],
            [x - this.width * 2, y],
            [x - this.width * 3, y]
        ]
        this.changeX = changeX
        this.changeY =  changeY

        this.render = function () {
            ctx.fillStyle = this.color

            // ctx.fillRect(this.x, this.y, this.width, this.height)
            for (let i = 0; i < array.length; i++) {
                ctx.fillRect(array[i][0], array[i][1], this.width, this.height)
            }

        }
        this.move = function () {

            if (this.alive) {
                // console.log(this.changeX)
                array.unshift([array[0][0] + this.changeX, array[0][1] + this.changeY])
                array.pop()
                this.render()
                // console.log(array)
                // this.x += 10
            }
        }

        this.detectCollision = function (){
            // console.log(game.height )
            // console.log(game.width )
            // console.log(array[0][1])
            
            if (array[0][0] < 0 || array[0][0] > game.width - snake.width || array[0][1] < 0 || array[0][1] > game.height - snake.height) {
                gameStatus.textContent = 'you hit the wall'
                console.log("you hit the wall")
                snake.alive = false;
            }
        }


    }
}

class Target {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true


        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }

    }
}
// ====================== HELPER FUNCTIONS ======================= //
//  KEYBOARD INTERACTION LOGIC
const movementHandler = (e) => {
    console.log(`movement: ${e.key}`)
    switch (e.key) {
        case 'ArrowUp':
            console.log(snake.changeX)
            snake.changeX = 0
            snake.changeY = -10
            break
        case 'ArrowDown':
            snake.changeX = 0
            snake.changeY = 10
            break
        case 'ArrowLeft':
            snake.changeX = -10
            snake.changeY = 0
            break
        case 'ArrowRight':
            // snake.x < game.width - snake.width ? snake.moveR() : null
            snake.changeX = 10
            snake.changeY = 0

            console.log("move")
            break
    }

}


function addNewTarget() {
    target.alive = false;
    setTimeout(function () {
        let x = Math.floor(Math.random() * game.width) - 40;
        let y = Math.floor(Math.random() * game.height) - 80;
        target = new Target(x, y, "#bada55", 40, 80);
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
        addNewTarget();
    } else {
        return false;
    }
}






// ====================== GAME PROCESSES ======================= //
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = `X: ${snake.x}\nY: ${snake.y}`
    if (target.alive) {
        target.render()
        detectHit(snake, target)
        snake.detectCollision()
        snake.move()

    }
    snake.render()
    // snake.move()

}
// ====================== PAINT INITIAL SCREEN ======================= //
// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function (e) {
    snake = new Snake(400, 200, '#00ff00', 20, 20, 6,10,0)
    target = new Target(100, 100, '#ff0000', 40, 80, 3)
    const runGame = this.setInterval(gameLoop, 120)
})
document.addEventListener('keydown', movementHandler)
