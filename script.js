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
    score = 0;
    birdY = 200;
    velocity = 0;
    bird.style.top = birdY + "px";
    scoreVal.textContent = score;

    if (gameLoop) clearInterval(gameLoop);

    gameLoop = setInterval(() => {
        velocity += gravity;
        birdY += velocity;
        bird.style.top = birdY + "px";

        // Verifica límites de pantalla
        if (birdY > window.innerHeight - 60 || birdY < 0) {
            endGame();
        }

        // Aumenta puntuación con el tiempo como ejemplo
        score++;
        scoreVal.textContent = score;
    }, 20);
}

// Función para volar (saltar)
function fly() {
    if (!gameStarted) return;
    velocity = -10; // Salto hacia arriba
}

// Función para terminar el juego
function endGame() {
    clearInterval(gameLoop);
    gameStarted = false;
    message.innerHTML = `Game Over<br>Puntuación: ${score}<br><small>Toca para volver a jugar</small>`;
    message.style.display = "block";
}

// Detecta toques en pantalla
document.addEventListener("touchstart", () => {
    if (!gameStarted) {
        startGame();
    } else {
        fly();
    }
});

// Detecta clics del mouse (para pruebas en PC)
document.addEventListener("mousedown", () => {
    if (!gameStarted) {
        startGame();
    } else {
        fly();
    }
});
