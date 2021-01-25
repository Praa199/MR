let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let splash = document.querySelector('.splash')
let gOver = document.querySelector('.game-over')

let lives = []

let intervalId = 0 
let resource = 0;

let moonImg = document.createElement('img')
moonImg.src = '/images/moon NASA1.jpg'

let earth = document.createElement('img')
earth.src = '/images/earth.png'

let singleCrater = new Image()
singleCrater.src = '/images/craterspng.png'

let singleIce = new Image()
singleIce.src = '/images/ice.png'

let rover = new Image()
rover.src = '/images/rov1.png'
let roverXY = {x: 758, y:380 }
let movement 

let craters = [{x: 0, y: 300 }]

let ices = [{x: 0, y: 0 }]
let board = { x: 0 , y: 150 }
let upArrow = false;
let downArrow = false

function draw(){
    
    drawCraters()
    drawIces()
    drawScore()
    drawRover()
}


function drawRover(){
    document.addEventListener('keydown', (event) => {
        if (event.keyCode == 38 || event.key == "ArrowUp") {
            upArrow = true;
            downArrow = false;
            
            if (roverXY.y >= 130) {
            roverXY.y -= 1
            
        } 
    }
    else if (event.keyCode == 40 || event.key == "ArrowDown") {
        upArrow = false;
        downArrow = true;
        if (roverXY.y <= 550) {
            roverXY.y += 1
            
        }
    }
    console.log(roverXY.y)
})

document.addEventListener('keyup', (event) => {
    upArrow = false;
    downArrow = false;
})

ctx.drawImage(rover, 758, roverXY.y)
ctx.drawImage(earth, 0, 5)
}

function drawCraters(){
    ctx.drawImage(moonImg, 0, 0)
    
    for (let i = 0; i < craters.length; i++) {
    ctx.drawImage(singleCrater, craters[i].x, craters[i].y )
    craters[i].x+=5
    craters[i].y+=.1
    
    if (craters[i].x == 300 ) {
        craters.push(
            {
                x: -50, 
                y: Math.floor(Math.random() * canvas.height -135)
            }
            )
        }
    }

    if (craters.x + singleCrater.width >= roverXY.x + rover.width && craters.y + singleCrater.height >= roverXY.y + rover.height ) {
        console.log('ouch')
        lives.push('ouch')
        if(lives.length == 1){
            return gameOver()
        }
    }
}

function drawIces(){
    for (let j = 0; j < ices.length; j++) {
        ctx.drawImage(singleIce, ices[j].x, ices[j].y )
    ices[j].x+=5
    ices[j].y+=.1
    
    if (ices[j].x == 400) {
        ices.push(
            {
                x: 0, 
                y: Math.floor(Math.random() * canvas.height - 50) 
            }
            )
    
    }
}}

function drawScore() {
ctx.drawImage(singleIce, 585, 10 )
ctx.font = '30px Verdana '
ctx.fillStyle = 'white'
ctx.fillText('Resource:  ' + resource, 650, 50)
}    
/* intervalId = setInterval(() => {
    requestAnimationFrame(draw)
    console.log('hey')
}, 10000)
 */

function startGame(){
    gOver.style.display = 'none'
    canvas.style.display = 'block'
    splash.remove()
    
    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
    draw()
}

window.addEventListener('load', () => {
    gOver.style.display = 'none'
    canvas.style.display = 'none'
    splash.style.display = 'block'
    let startBtn = document.querySelector('#game-start')
    
    startBtn.addEventListener('click', () => {
    startGame()    
    })

});    



function gameOver() {
    canvas.remove()
    gOver.style.display = 'block'
}


