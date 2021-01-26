let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let splash = document.querySelector('.splash')
let gOver = document.querySelector('.game-over')


let intervalId = 0 
let resource = 0;
let lives = 3

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
    drawRover()
    drawScore()
    drawLives()
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
    craters[i].y+=.5
    
    if (craters[i].x == 300 ) {
        craters.push( {

            x: -50, 
            y: Math.floor(Math.random() * canvas.height -135)
        }
        )
    }
    
    if (craters[i].x + (singleCrater.width -50) >= roverXY.x &&
        (roverXY.y > craters[i].y &&  
            (rover.y + rover.height < craters[i].y + (singleCrater.height - 20)))) {
            console.log('ouch')
        craters[i].x = 2000 
        craters[i].y =  2000 
        lives--
    }

    if(lives == 0){
        gameOver()
    }
}
}


function drawIces(){
    for (let j = 0; j < ices.length; j++) {
        ctx.drawImage(singleIce, ices[j].x, ices[j].y )
    ices[j].x+=5
    ices[j].y+=.5
    
    if (ices[j].x == 400) {
        ices.push(
            {
                x: 0, 
                y: Math.floor(Math.random() * canvas.height - 50) 
            }
            )
            
        }

        if (ices[j].x + (singleIce.width -10) >= roverXY.x &&
        (roverXY.y > ices[j].y &&  
            (rover.y + rover.height < ices[j].y + (singleCrater.height - 10)))) {
                console.log('yay')
                ices[j].x = 2000 
                ices[j].y =  2000 
                resource++
            }
        }
    }

    
    function drawScore() {
ctx.drawImage(singleIce, 585, 10 )
ctx.font = '30px Verdana '
ctx.fillStyle = 'white'
ctx.fillText('Resource:  ' + resource, 650, 50)
}    


function drawLives(){
ctx.font = '30px Verdana '
ctx.fillStyle = 'white'
ctx.fillText('Lives: ' + lives, 700, 90)
}


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
    canvas.style.display = 'none'
    gOver.style.display = 'block'
    
    let replayBtn = document.querySelector('#replay')
    
    replayBtn.addEventListener('click', () => {
        startGame()    
        clearInterval(intervalId)
    })
}


