const bird = document.querySelector(".bird");
const message = document.querySelector(".message");
const scoreVal = document.querySelector(".score_val");

let birdY = 200;
let gravity = 2;
let velocity = 0;
let gameStarted = false;
let score = 0;
let gameLoop;

function startGame() {
    message.style.display = "none";
    gameStarted = true;
    score = 0;
    scoreVal.textContent = score;

    birdY = 200;
    bird.style.top = birdY + "px";

    gameLoop = setInterval(() => {
        velocity += gravity;
        birdY += velocity;
        bird.style.top = birdY + "px";

        if (birdY > window.innerHeight - 60 || birdY < 0) {
            endGame();
        }
    }, 20);
}

function fly() {
    if (!gameStarted) return;
    velocity = -10;
}

function endGame() {
    clearInterval(gameLoop);
    message.innerHTML = `Game Over<br>Puntuación: ${score}<br><small>Toca para volver a jugar</small>`;
    message.style.display = "block";
    gameStarted = false;
}

// Detecta toque o clic
document.addEventListener("touchstart", () => {
    if (!gameStarted) {
        startGame();
    }
    fly();
});

document.addEventListener("mousedown", () => {
    if (!gameStarted) {
        startGame();
    }
    fly();
});
