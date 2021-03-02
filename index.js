


// //----------- html elements

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let splash = document.querySelector('.splash-container')
let startBtn = document.querySelector('.start-game')
let gWon = document.querySelector('.game-won-container')
let replayBtn = document.querySelector('#replay-button')
let gOver = document.querySelector('.game-over-container')
let restartBtn = document.querySelector('#restart-button')

// //-------------images


// // let moonImg = document.createElement('img')
// // moonImg.src = 'images/moon NASA1.jpg'

let earth = document.createElement('img')
earth.src = 'images/earth.png'

let singleCrater = new Image()
singleCrater.src = 'images/craterspng.png'

let singleIce = new Image()
singleIce.src = 'images/ice.png'

let rover = new Image()
rover.src = 'images/rov1.png'
let downArrow 
let upArrow 

// //----------- game charactors

let roverX = 790
let roverY = 380
let craters = [{x: 0, y: 300 }]

let ices = [{x: 0, y: 0 }]

let board = { x: 0 , y: 150 }

// //----------scores


let intervalId = 0 
let resource = 0;
let lives = 3

// //-------------draw functions


function draw(){
    ctx.clearRect(roverX, roverY, rover.width, rover.height)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    drawCraters() 
    drawIces() 
    drawRover()
    drawLives()
    drawScore()
    
    
    if(upArrow && roverY>130){
        roverY-=10
    } 

    if(downArrow && roverY<500){
        roverY+=10
    } 

}

function drawRover(){
    
    ctx.drawImage(rover, roverX, roverY)
    document.addEventListener('keydown', (event) => {
        
            if (event.keyCode == 38 || event.key == "ArrowUp") {
                upArrow = true;
                downArrow = false;
        }
        else if (event.keyCode == 40 || event.key == "ArrowDown") {
                upArrow = false;
                downArrow = true;
            } 
    })
    
    document.addEventListener('keyup', (event) => {
        upArrow = false;
        downArrow = false;
    })
    
    //ctx.drawImage(earth, 0, 5)
}


function drawCraters(){
    
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

    //------------------------crater colision
    
    if ((craters[i].x +30) + (singleCrater.width -30) >= roverX &&
        (roverY > craters[i].y &&  
            (roverY + rover.height < (craters[i].y + 20) + (singleCrater.height - 15)))) {
            console.log('ouch')
            lives-= 1
            craters.splice(i,1)
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

        //------------------------ice colision

        if (ices[j].x + singleIce.width  >= roverX &&
        (roverY >= ices[j].y &&  
            (roverY + rover.height <= ices[j].y + singleIce.height))) {
                console.log('yay')
                resource+=1
                ices.splice(j,1)
            }
        }
        if( resource == 3){
            gameWon()
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

//---------- game functions


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
    gWon.style.display = 'none'
    canvas.style.display = 'block'
    splash.style.display = 'none'
    
    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
}


function gameOver() {
    canvas.style.display = 'none'
    gOver.style.display = 'block'
    splash.style.display = 'none'

    clearInterval(intervalId)
}



function gameWon() {
    canvas.style.display = 'none'
    gWon.style.display = 'block'

    clearInterval(intervalId)
}

    window.addEventListener('load', () => {
        gOver.style.display = 'none'
        canvas.style.display = 'none'
        gWon.style.display = 'none'
        splash.style.display = 'block'
    
        startBtn.addEventListener('click', () => {
        startGame()    
    })
    
    restartBtn.addEventListener('click', () => {
        console.log('restart')
        resource = 0;
        lives = 3
        startGame()    
    })
    
    replayBtn.addEventListener('click', () => {
        console.log('replay')
        resource = 0;
        lives = 3
        startGame()    
    })
    });    





//--------------------------------------------------------------------

