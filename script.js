const bird = document.querySelector(".bird");
const message = document.querySelector(".message");
const scoreVal = document.querySelector(".score_val");

let birdY = 200;
let gravity = 1.5;
let velocity = 0;
let gameStarted = false;
let score = 0;
let gameLoop;

// Función para iniciar el juego
function startGame() {
  message.style.display = "none";
  gameStarted = true;
  birdY = 200;
  velocity = 0;
  score = 0;
  bird.style.top = birdY + "px";
  scoreVal.textContent = score;

  if (gameLoop) clearInterval(gameLoop);

  gameLoop = setInterval(() => {
    velocity += gravity;
    birdY += velocity;
    bird.style.top = birdY + "px";

    // Termina si se sale de pantalla
    if (birdY > window.innerHeight - 60 || birdY < 0) {
      endGame();
    }

    // Aumenta puntuación con el tiempo
    score++;
    scoreVal.textContent = score;
  }, 20);
}

// Salto del pájaro
function fly() {
  if (!gameStarted) return;
  velocity = -10;
}

// Terminar juego
function endGame() {
  clearInterval(gameLoop);
  message.innerHTML = `Game Over<br>Puntuación: ${score}<br><small>Toca para reiniciar</small>`;
  message.style.display = "block";
  gameStarted = false;
}

// 👇 ESCUCHA TOQUES Y CLICS
document.body.addEventListener("touchstart", () => {
  if (!gameStarted) {
    startGame();
  } else {
    fly();
  }
});

document.body.addEventListener("mousedown", () => {
  if (!gameStarted) {
    startGame();
  } else {
    fly();
  }
});
