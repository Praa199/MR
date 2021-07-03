const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let splash = document.querySelector(".splash-container");
let gWon = document.querySelector(".game-won-container");
let gOver = document.querySelector(".game-over-container");
let startBtn = document.querySelector(".start-game");
let restartBtn = document.querySelector("#restart-button");
let replayBtn = document.querySelector("#replay-button");
let downArrow = false;
let upArrow = false;
let leftArrow = false;
let rightArrow = false;
let resource = 0;
let lives = 3;
let intervalId = 0;
const radius = 0;

let singleIce = new Image();
singleIce.src = "images/ice.png";

let roverImage = new Image();
roverImage.src = "images/rov1.png";

let roverArray = {
  x: 275,
  y: 130,
  width: 20,
  height: 15,
};
let iceArray = [
  {
    x: -70,
    y: 75,
    width: 12,
    height: 12,
  },
];
let craterArray = [
  {
    x: -20,
    y: 100,
    radius: radius,
  },
];

function startGame() {
  roverArray = {
    x: 275,
    y: 130,
    width: 20,
    height: 15,
  };
  iceArray = [
    {
      x: -70,
      y: 75,
      width: 12,
      height: 12,
    },
  ];
  craterArray = [
    {
      x: -20,
      y: 100,
      radius: radius,
    },
  ];

  intervalId = 0;
  resource = 0;
  lives = 3;

  gOver.style.display = "none";
  gWon.style.display = "none";
  canvas.style.display = "block";
  splash.style.display = "none";

  intervalId = setInterval(() => {
    requestAnimationFrame(drawGame);
  }, 100);
}

function gameWon() {
  clearInterval(intervalId);
  canvas.style.display = "none";
  gWon.style.display = "block";
}

function gameOver() {
  clearInterval(intervalId);
  canvas.style.display = "none";
  gOver.style.display = "block";
}

function drawScore() {
  ctx.font = "50% Verdana ";
  ctx.fillStyle = "white";
  ctx.fillText("Score:  " + resource + "/5", 240, 10);
}

function drawLives() {
  ctx.font = "50% Verdana ";
  ctx.fillStyle = "white";
  ctx.fillText("Lives: " + lives + "/3", 240, 25);
}

function drawRover() {
  ctx.drawImage(
    roverImage,
    roverArray.x,
    roverArray.y,
    roverArray.width,
    roverArray.height
  );

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 38 || event.key == "ArrowUp") {
      upArrow = true;
      downArrow = false;
      leftArrow = false;
      rightArrow = false;
    }

    if (event.keyCode == 40 || event.key == "ArrowDown") {
      upArrow = false;
      leftArrow = false;
      rightArrow = false;
      downArrow = true;
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
  });

  if (upArrow && roverArray.y > 0) {
    roverArray.y -= 5;
  }

  if (downArrow && roverArray.y < 140) {
    roverArray.y += 5;
  }

  if (rightArrow && roverArray.x < 285) {
    roverArray.x += 5;
  }

  if (leftArrow && roverArray.x > 0) {
    roverArray.x -= 5;
  }

  document.addEventListener("keyup", (event) => {
    upArrow = false;
    downArrow = false;
    rightArrow = false;
    leftArrow = false;
  });
}

function craterCollision(i) {
  lives -= 1;
  craterArray.splice(i, 1);

  if (lives == 0) {
    gameOver();
  }
}

function addMoreCraters() {
  craterArray.push({
    x: -70,
    y: Math.floor(Math.random() * 130),
    radius: Math.floor(Math.random() * (16 - 7) + 7),
  });
}

function drawCraters() {
  for (let i = 0; i < craterArray.length; i++) {
    ctx.beginPath();
    ctx.arc(
      craterArray[i].x,
      craterArray[i].y,
      craterArray[i].radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#003300";
    craterArray[i].x += 1;

    if (craterArray[i].x == 0) {
      addMoreCraters();
    }

    if (
      craterArray[i].x - craterArray[i].radius < roverArray.x + 14 &&
      craterArray[i].x + craterArray[i].radius > roverArray.x &&
      craterArray[i].y - craterArray[i].radius < roverArray.y + 7 &&
      craterArray[i].y + craterArray[i].radius > roverArray.y
    ) {
      craterCollision(i);
    }
  }
}

function iceCollision(i) {
  resource += 1;
  iceArray.splice(i, 1);

  if (resource >= 2) {
    addMoreCraters();
  }

  if (resource >= 3) {
    addMoreCraters();
  }

  if (resource == 5) {
    gameWon();
  }
}

function addMoreIce() {
  iceArray.push({
    x: -70,
    y: Math.floor(Math.random() * 130),
    width: 12,
    height: 12,
  });
}

function drawIces() {
  for (let i = 0; i < iceArray.length; i++) {
    ctx.drawImage(
      singleIce,
      iceArray[i].x,
      iceArray[i].y,
      iceArray[i].width,
      iceArray[i].height
    );
    ctx.closePath();
    iceArray[i].x += 1;

    if (iceArray[i].x == 0) {
      addMoreIce();
    }

    if (
      iceArray[i].x < roverArray.x + roverArray.width &&
      iceArray[i].x + iceArray[i].width > roverArray.x &&
      iceArray[i].y < roverArray.y + roverArray.height &&
      iceArray[i].y + iceArray[i].height > roverArray.y
    ) {
      iceCollision(i);
    }
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRover();
  drawCraters();
  drawIces();
  drawScore();
  drawLives();
}

window.addEventListener("load", () => {
  gOver.style.display = "none";
  canvas.style.display = "none";
  gWon.style.display = "none";
  splash.style.display = "block";

  startBtn.addEventListener("click", () => {
    startGame();
  });

  restartBtn.addEventListener("click", () => {
    resource = 0;
    lives = 3;
    startGame();
  });

  replayBtn.addEventListener("click", () => {
    resource = 0;
    lives = 3;
    startGame();
  });
});
