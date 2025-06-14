const bird = document.querySelector(".bird");
const message = document.querySelector(".message");
const scoreVal = document.querySelector(".score_val");

// Cargar audio
const jumpSound = new Audio("audio/jump.mp3");
jumpSound.load();

let birdY = 200;
let velocity = 0;
let gravity = 1.5;
let gameStarted = false;
let gameLoop;
let score = 0;

function startGame() {
  message.style.display = "none";
  birdY = 200;
  velocity = 0;
  score = 0;
  gameStarted = true;
  bird.style.top = birdY + "px";
  scoreVal.textContent = score;

  if (gameLoop) clearInterval(gameLoop);

  gameLoop = setInterval(() => {
    velocity += gravity;
    birdY += velocity;
    bird.style.top = birdY + "px";

    if (birdY > window.innerHeight - 60 || birdY < 0) {
      endGame();
    }

    score++;
    scoreVal.textContent = score;
  }, 20);
}

function fly() {
  if (!gameStarted) return;
  velocity = -10;

  // Reproduce el sonido
  jumpSound.currentTime = 0;
  jumpSound.play().catch(e => {
    console.log("No se pudo reproducir el sonido:", e);
  });
}

function endGame() {
  clearInterval(gameLoop);
  gameStarted = false;
  message.innerHTML = `Game Over<br>Puntuación: ${score}<br><small>Toca para volver a jugar</small>`;
  message.style.display = "block";
}

// Escuchar toque en móviles y clic en PC
document.body.addEventListener("touchstart", () => {
  gameStarted ? fly() : startGame();
});

document.body.addEventListener("mousedown", () => {
  gameStarted ? fly() : startGame();
});
