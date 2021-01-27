let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let splash = document.querySelector('.splash-container')
let gOver = document.querySelector('.game-over-container')
let startBtn = document.querySelector('.start-game')
let replayBtn = document.querySelector('#replay-button')
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
let downArrow 
let upArrow 

let roverX = 790
let roverY = 380
let craters = [{x: 0, y: 300 }]

let ices = [{x: 0, y: 0 }]

let board = { x: 0 , y: 150 }
let intervalId = 0 
let resource = 0;
let lives = 3



function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    drawCraters() 
    drawIces() 
    drawRover()
    drawLives()
    drawScore()
    
    
    if(upArrow && roverY <= 550){
        roverY-=10
    } 
    else{
    roverY+=0
}

    if(downArrow && roverY >= 130){
        roverY+=10
    } 
    else{
        roverY+=0
    }
}


function drawRover(){
    ctx.clearRect(0,0, rover.width, rover.height)
    ctx.drawImage(rover, roverX, roverY)
    document.addEventListener('keydown', (event) => {
        
            if (event.keyCode == 38 || event.key == "ArrowUp" && roverY <540) {
                upArrow = true;
                downArrow = false;
        }
        else if (event.keyCode == 40 || event.key == "ArrowDown" && roverY>130) {
                upArrow = false;
                downArrow = true;
            } 
    })
    
    document.addEventListener('keyup', (event) => {
        upArrow = false;
        downArrow = false;
    })
    
    ctx.drawImage(earth, 0, 5)
}


function drawCraters(){
    ctx.drawImage(moonImg, 0, 0)
    
    for (let i = 0; i < craters.length; i++) {
    ctx.drawImage(singleCrater, craters[i].x, craters[i].y )
    craters[i].x+=5
    craters[i].y+=1
    
    if (craters[i].x == 300 ) {
        craters.push( {

            x: -50, 
            y: Math.floor(Math.random() * canvas.height -135)
        }
        )
    }
    
    if (craters[i].x + (singleCrater.width -25) >= roverX &&
        (roverY > craters[i].y &&  
            (rover.y + rover.height < craters[i].y + (singleCrater.height - 10)))) {
            console.log('ouch')
            lives-= 1
            craters[i] = craters[i].length -1
    }

}
if(lives == 0){
    gameOver()
}
}


function drawIces(){
    for (let j = 0; j < ices.length; j++) {
        ctx.drawImage(singleIce, ices[j].x, ices[j].y )
    ices[j].x+=5
    ices[j].y+=1
    
    if (ices[j].x == 400) {
        ices.push(
            {
                x: 0, 
                y: Math.floor(Math.random() * canvas.height - 50) 
            }
            )
            
        }

        if (ices[j].x + (singleIce.width -10) >= roverX &&
        (roverY > ices[j].y &&  
            (rover.y + rover.height < ices[j].y + (singleIce.height - 5)))) {
                console.log('yay')
                resource+=1
                ices[j] = ices[j].length -1 
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
roverX = 790
roverY = 380
craters = [{x: 0, y: 300 }]

ices = [{x: 0, y: 0 }]

board = { x: 0 , y: 150 }
intervalId = 0 
resource = 0;
lives = 3

    gOver.style.display = 'none'
    canvas.style.display = 'block'
    splash.style.display = 'none'
    
    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
}

window.addEventListener('load', () => {
    gOver.style.display = 'none'
    canvas.style.display = 'none'
    splash.style.display = 'block'

    startBtn.addEventListener('click', () => {
    startGame()    
})

replayBtn.addEventListener('click', () => {
    console.log('replay')
    resource = 0;
    lives = 3
    startGame()    
})
});    



function gameOver() {
    canvas.style.display = 'none'
    gOver.style.display = 'block'

    clearInterval(intervalId)

    
}

function rePlay(){
    
}
