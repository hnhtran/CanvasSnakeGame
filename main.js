console.log('linked')
// let body = document.querySelector('body')
// document.body.style.backgroundColor = '#fe57a1'
const canvas = document.createElement('canvas')
// canvas.width = window.innerWidth
canvas.setAttribute('id', 'snake')
canvas.setAttribute('width', '250')
canvas.setAttribute('height', '300')
canvas.setAttribute('style', 'border: 1px solid black')
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ff0000'
// ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillRect(10, 10, 30, 50)

const snake = {}
snake.game = function() {
    console.log('game')
}
snake.game()