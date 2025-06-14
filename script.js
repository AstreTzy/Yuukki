const bird = document.querySelector(".bird");
const message = document.querySelector(".message");
const scoreVal = document.querySelector(".score_val");

const jumpSound = new Audio("audio/jump.mp3");
jumpSound.load();

let birdY = 200;
let velocity = 0;
let gravity = 1.5;
let gameStarted = false;
let gameLoop;
let pipeInterval;
let score = 0;

// Cambia la imagen del pájaro a Bird2.png al volar
function fly() {
  if (!gameStarted) return;
  velocity = -10;

  jumpSound.currentTime = 0;
  jumpSound.play().catch(() => {});

  bird.src = "images/Bird2.png";
  setTimeout(() => {
    bird.src = "images/Bird.png";
  }, 200);
}

function startGame() {
  message.style.display = "none";
  birdY = 200;
  velocity = 0;
  score = 0;
  bird.style.top = birdY + "px";
  scoreVal.textContent = score;
  bird.src = "images/Bird.png";

  removeAllPipes();

  gameStarted = true;

  gameLoop = setInterval(() => {
    velocity += gravity;
    birdY += velocity;
    bird.style.top = birdY + "px";

    if (birdY > window.innerHeight - 60 || birdY < 0) {
      endGame();
    }

    checkCollision();
  }, 20);

  pipeInterval = setInterval(createPipe, 2000);
}

function endGame() {
  clearInterval(gameLoop);
  clearInterval(pipeInterval);
  gameStarted = false;
  message.innerHTML = `Game Over<br>Puntuación: ${score}<br><small>Toca para jugar de nuevo</small>`;
  message.style.display = "block";
}

document.body.addEventListener("touchstart", () => {
  gameStarted ? fly() : startGame();
});

document.body.addEventListener("mousedown", () => {
  gameStarted ? fly() : startGame();
});

// ----------------- DESAFÍOS: TUBOS ------------------

function createPipe() {
  const pipeTop = document.createElement("img");
  pipeTop.src = "images/pipeTop.png";
  pipeTop.className = "pipe";
  pipeTop.style.top = "0px";

  const pipeBottom = document.createElement("img");
  pipeBottom.src = "images/pipeBottom.png";
  pipeBottom.className = "pipe";

  const gap = 150;
  const pipeHeight = Math.floor(Math.random() * 200) + 100;

  pipeTop.style.height = pipeHeight + "px";
  pipeBottom.style.height = (window.innerHeight - pipeHeight - gap) + "px";
  pipeBottom.style.top = (pipeHeight + gap) + "px";

  const pipeX = window.innerWidth;
  pipeTop.style.left = pipeX + "px";
  pipeBottom.style.left = pipeX + "px";

  document.body.appendChild(pipeTop);
  document.body.appendChild(pipeBottom);

  movePipe(pipeTop, pipeBottom);
}

function movePipe(pipeTop, pipeBottom) {
  let pipeX = window.innerWidth;

  const move = setInterval(() => {
    if (!gameStarted) {
      clearInterval(move);
      pipeTop.remove();
      pipeBottom.remove();
      return;
    }

    pipeX -= 3;
    pipeTop.style.left = pipeX + "px";
    pipeBottom.style.left = pipeX + "px";

    if (pipeX < -60) {
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(move);
      score++;
      scoreVal.textContent = score;
    }
  }, 20);
}

function removeAllPipes() {
  document.querySelectorAll(".pipe").forEach(pipe => pipe.remove());
}

// ---------------- COLISIÓN ------------------

function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  const pipes = document.querySelectorAll(".pipe");

  for (let pipe of pipes) {
    const pipeRect = pipe.getBoundingClientRect();
    if (
      birdRect.left < pipeRect.right &&
      birdRect.right > pipeRect.left &&
      birdRect.top < pipeRect.bottom &&
      birdRect.bottom > pipeRect.top
    ) {
      endGame();
      break;
    }
  }
}
