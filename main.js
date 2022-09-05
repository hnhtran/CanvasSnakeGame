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
    constructor(x, y, color, width, height, changeX, changeY) {
        let array = [
            [x, y],
            [x - this.width, y],
            [x - this.width * 2, y],
            [x - this.width * 3, y]
        ]
        this.x = array[0][0]
        this.y = array[0][1]
        this.color = color
        this.width = width
        this.height = height
        this.alive = true

        this.changeX = changeX
        this.changeY = changeY

        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.strokestyle = 'black'

            // ctx.fillRect(this.x, this.y, this.width, this.height)
            for (let i = 0; i < array.length; i++) {
                ctx.fillRect(array[i][0], array[i][1], this.width, this.height)
                ctx.strokeRect(array[i][0], array[i][1], this.width, this.height)

                this.x = array[0][0]
                this.y = array[0][1]
            }

        }
        this.move = function () {
        // head move 1 step, tail move one step. Therefore, unshift arr 1, pop arr 1
            if (this.alive) {
                array.unshift([array[0][0] + this.changeX, array[0][1] + this.changeY])
                array.pop()
                this.render()
            }
        }
        this.eatMouse = function () {
            array.unshift([array[0][0] + this.changeX, array[0][1] + this.changeY])
        }

        this.detectCollision = function () {
        // detect if snake hit the walls, detect if the snake hit itself
            // hit the walls
            if (array[0][0] < 0 || array[0][0] > game.width - snake.width|| array[0][1] < 0 || array[0][1] > game.height - snake.height) {
                gameStatus.textContent = 'you hit the wall'
                console.log("you hit the wall")
                snake.alive = false;
            }
            // hit itself
            if(array.length > 4) {
                for (let i = 1; i < array.length; i++) {
                    // console.log(array)
                    if (array[0][0] == array[i][0] && array[0][1] == array[i][1]) {
                        gameStatus.textContent = 'you hit yourself'
                        console.log("you hit yourself")
                        snake.alive = false;
                    }
                }
            }
            return snake.alive
        }

    }
}

class Mouse {
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
let direction = 'ArrowRight'
const movementHandler = (e) => {
    e.preventDefault()
    let newDirection = e.key
    let nextDirection
    let allowedDirections = []
    console.log(`direction: ${direction}`)
    switch (direction) {
        case 'ArrowUp':
        case 'ArrowDown':
            allowedDirections = ['ArrowLeft', 'ArrowRight']
            break
        case 'ArrowLeft':
        case 'ArrowRight':
            allowedDirections = ['ArrowUp', 'ArrowDown']
            break
        default:
            throw new Error('invalid direction')
    }
    if (allowedDirections.includes(newDirection)) {
        console.log(`new direction: ${newDirection}`)
        nextDirection = newDirection
        direction = nextDirection
    } 
    console.log(`nextDirection: ${nextDirection}`)
    console.log(`direction: ${direction}`)
    console.log(`allowedDirections: ${allowedDirections}`)
        snake.changeX = 0
        snake.changeY = 0
        switch (nextDirection) {
            case 'ArrowUp':
                snake.changeY = -snake.height
                break;
            case 'ArrowDown':
                snake.changeY = snake.height
                break;
            case 'ArrowLeft':
                snake.changeX = -snake.width
                break;
            case 'ArrowRight':
                snake.changeX = snake.width
                break;
        }
    // switch (nextDirection) {
    //     case 'w':
    //     case 'W':
    //     case 'ArrowUp':
    //         snake.changeX = 0
    //         snake.changeY = -snake.height
    //         break
    //     case 's':
    //     case 'S':
    //     case 'ArrowDown':
    //         snake.changeX = 0
    //         snake.changeY = snake.height
    //         break
    //     case 'ArrowLeft':
    //     case 'a':
    //     case 'A':
    //         snake.changeX = -snake.width
    //         snake.changeY = 0
    //         break
    //     case 'd':
    //     case 'D':
    //     case 'ArrowRight':
    //         snake.changeX = snake.width
    //         snake.changeY = 0
    //         break
    // }
}

function addNewTarget() {
    target.alive = false;
    setTimeout(function () {
        let [x, y] = randomCoordinates()
        target = new Mouse(x, y, '#ff0000', 20, 20);
        gameStatus.textContent = 'keep playing'

    }, 1000);
    return true;
}

function randomCoordinates() {
    let x, y
    while (x % 20 != 0 || y % 20 != 0 || x < 0 || y < 0) {
        x = Math.floor(Math.random() * game.width) - 20;
        y = Math.floor(Math.random() * game.height) - 20;
    }
    return [x, y]
}

function detectHit(p1, p2) {
    // console.log(p2.x, p2.y)
    let hitTest = p1.x == p2.x && p1.y == p2.y

    if (hitTest) {
        // add 100 points
        // console.log("hit");
        let newScore = Number(score.textContent) + 100;
        score.textContent = newScore;
        gameStatus.textContent = 'Yumm!!'
        // gameStatus.textContent = 'You just had a yummy mouse meat !!'
        addNewTarget();
        p1.eatMouse();
    } else {
        return false;
    }
}


// ====================== GAME PROCESSES ======================= //
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = `X: ${snake.x}\nY: ${snake.y}`
    if (target.alive && snake.alive) {
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
    e.preventDefault()
    snake = new Snake(400, 200, '#00ff00', 20, 20, 00, 0)
    target = new Mouse(100, 100, '#ff0000', 20, 20)
    const runGame = this.setInterval(gameLoop, 120)
})
document.addEventListener('keydown', movementHandler)
