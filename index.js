const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let splash = document.querySelector('.splash-container')
let gWon = document.querySelector('.game-won-container')
let gOver = document.querySelector('.game-over-container')
let startBtn = document.querySelector('.start-game')
let restartBtn = document.querySelector('#restart-button')
let replayBtn = document.querySelector('#replay-button')
let downArrow = false;
let upArrow = false;
let leftArrow = false;
let rightArrow = false; 
let resource = 0;
let lives = 3
let intervalId = 0 
const radius = 0


let rover = {
    x:275,
    y: 130,
    width:10,
    height: 5
};
let iceArray = [
    {
        x: -70,
        y: 75,
        width: 8,
        height: 8
    }
]
let craterArray = [{
    x: -20,
    y: 100,
    radius: radius,
    width: 15,
    height: 10
}]

function startGame(){
    rover = {
        x:275,
        y: 130,
        width:10,
        height: 5
    };
    iceArray = [
        {
            x: -70,
            y: 75,
            width: 8,
            height: 8
        }
    ]
    craterArray = [{
        x: -20,
        y: 100,
        width: 15,
        height: 10
    }]
    
intervalId = 0 
resource = 0;
lives = 3

    gOver.style.display = 'none'
    gWon.style.display = 'none'
    canvas.style.display = 'block'
    splash.style.display = 'none'
    
    intervalId = setInterval(() => {
        requestAnimationFrame(drawGame)
    }, 100)
}

function gameWon() {
    clearInterval(intervalId)
    canvas.style.display = 'none'
    gWon.style.display = 'block'
}

function gameOver() {
    clearInterval(intervalId)   
    canvas.style.display = 'none'
    gOver.style.display = 'block'
}

function drawScore() {
    ctx.font = '50% Verdana '
    ctx.fillStyle = 'white'
    ctx.fillText('Score:  ' + resource + "/10", 240, 10)
}    


function drawLives(){
ctx.font = '50% Verdana '
ctx.fillStyle = 'white'
ctx.fillText('Lives: ' + lives + "/3", 240, 25)
}

function drawRover() {
ctx.beginPath();
ctx.fillStyle = "#9d9d9e";
ctx.fillRect(rover.x, rover.y, rover.width, rover.height);
ctx.closePath();

document.addEventListener('keydown', (event) => {
    
    if (event.keyCode == 38 || event.key == "ArrowUp") {
        upArrow = true;
        downArrow = false;
        leftArrow = false;
        rightArrow = false;
        }

    if (event.keyCode == 40 || event.key == "ArrowDown") {
        upArrow = false;
        downArrow = true;
        leftArrow = false;
        rightArrow = false;
        } 

    if (event.keyCode == 37 || event.key == "ArrowLeft") {
        leftArrow = true;
        rightArrow = false;
        upArrow = false;
        downArrow = false;
        }

    if (event.keyCode == 39 || event.key == "ArrowRight") {
        rightArrow = true;
        leftArrow = false;
        upArrow = false;
        downArrow = false;
        } 
})

    if(upArrow && rover.y>0){
    rover.y-=5
    } 

    if(downArrow && rover.y<140){
        rover.y+=5
    } 

    if(rightArrow && rover.x<285){
        rover.x+=5
    } 

    if(leftArrow && rover.x>0){
        rover.x-=5
    } 

document.addEventListener('keyup', (event) => {
    upArrow = false;
    downArrow = false;
    rightArrow = false;
    leftArrow = false;
})
}

function craterCollision(i) {
    lives-=1
    craterArray.splice(i,1)
    if( resource == 3){
    }
    
    if (lives == 0) {
            gameOver()
        }
}

function addMoreCraters() {
    craterArray.push( {
        x: -70, 
        y: Math.floor(Math.random()* 130),
        radius: Math.floor(Math.random() * (16 - 7) + 7)
,
        width: 15,
        height: 10
    }
    )
}

function drawCraters(){

    
    for (let i = 0; i < craterArray.length; i++) {
        // ctx.beginPath();
        // ctx.fillStyle = "black";
        // ctx.fillRect(craterArray[i].x, craterArray[i].y, craterArray[i].width, craterArray[i].height);
        // ctx.closePath();
        // craterArray[i].x +=1    
ctx.beginPath();
ctx.arc(craterArray[i].x, craterArray[i].y, craterArray[i].radius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'black';
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = '#003300';
craterArray[i].x +=1  
// ctx.stroke();

        if (craterArray[i].x == 0 ) {
            addMoreCraters()
        }

        if (craterArray[i].x < rover.x + rover.width &&
            craterArray[i].x + craterArray[i].width > rover.x &&
            craterArray[i].y < rover.y + rover.height &&
            craterArray[i].y + craterArray[i].height > rover.y) {
                craterCollision(i)
        }
    }
}

function iceCollision(i) {
    resource+=1
    iceArray.splice(i,1)

    if (resource >= 2) {
        addMoreCraters()
    }

    if (resource >= 3) {
        addMoreCraters()
    }

    if (resource == 9) {
        gameWon()
    }
}

function addMoreIce() {
    iceArray.push( {
        x: -70, 
        y: Math.floor(Math.random()* 130),
        width: 8,
        height: 8
    }
    )
}

function drawIces(){

    for (let i = 0; i < iceArray.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#47a3ff";
        ctx.fillRect(iceArray[i].x, iceArray[i].y, iceArray[i].width, iceArray[i].height);
        ctx.closePath();
        iceArray[i].x +=1    

        if (iceArray[i].x == 0 ) {
            addMoreIce()
        }

        if (iceArray[i].x < rover.x + rover.width &&
            iceArray[i].x + iceArray[i].width > rover.x &&
            iceArray[i].y < rover.y + rover.height &&
            iceArray[i].y + iceArray[i].height > rover.y) {
                iceCollision(i)
        }
    }
}

function drawGame(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    drawRover()
    drawCraters()
    drawIces()
    drawScore()
    drawLives()
}

window.addEventListener('load', () =>{
        gOver.style.display = 'none'
        canvas.style.display = 'none'
        gWon.style.display = 'none'
        splash.style.display = 'block'

    startBtn.addEventListener('click', () => {
        startGame()    
    })
    
    restartBtn.addEventListener('click', () => {
        resource = 0;
        lives = 3
        startGame()    
    })
    
    replayBtn.addEventListener('click', () => {
        resource = 0;
        lives = 3
        startGame()    
    })
})