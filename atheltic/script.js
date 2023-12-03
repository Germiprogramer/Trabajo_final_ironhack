// Obtener referencias a elementos del DOM
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const aerialObstacle = document.getElementById('aerialObstacle');
const timeCounter = document.getElementById('timeCounter');
const jumpCounter = document.getElementById('jumpCounter');
// Variables de estado del juego
const aerialObstacleSpeed = 0.4;
let jumps = 0;
let seconds = 0;
let obstacleSpeed = 1;
const initialObstacleSpeed = 1;
const maxObstacleSpeed = 1.6;

// Evento de salto al presionar la tecla 'Space'
document.addEventListener('keydown', jump);

function jump(event) {
  // Verificar la tecla presionada y si el dinosaurio no está actualmente saltando
  if (event.code === 'Space' && !dino.classList.contains('jumping')) {
    // Agregar clase de salto y aplicar animación
    dino.classList.add('jumping');
    dino.style.animation = 'jumpAnimation 1.2s forwards';

    // Incrementar contador de saltos y actualizar en el DOM
    jumps++;
    jumpCounter.textContent = jumps;

    // Restablecer animación y clase de salto después de 1.2 segundos
    setTimeout(() => {
      dino.style.animation = '';
      dino.classList.remove('jumping');
    }, 1200);
  }
}


// Función para actualizar el temporizador del juego
function updateTimer() {
  seconds++;
  timeCounter.textContent = seconds;

  // Cada 10 segundos, aumentar la velocidad de los obstáculos y, a veces, crear un obstáculo aéreo
  if (seconds % 10 === 0) {
    obstacleSpeed += 0.2;

    // Restablecer la velocidad si supera el límite
    if (obstacleSpeed > maxObstacleSpeed) {
      obstacleSpeed = initialObstacleSpeed;
    }

    // Probabilidad del 30% de crear un obstáculo aéreo
    if (Math.random() < 0.3) {
      createHigherAerialObstacle();
    }
  }
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
  
    // Verificar si el elemento aerialObstacle existe
    const aerialObstacleRect = aerialObstacle ? aerialObstacle.getBoundingClientRect() : null;
  
    // Verificar la colisión con el obstáculo terrestre
    const obstacleCollision = (
      dinoRect.bottom > obstacleRect.top &&
      dinoRect.top < obstacleRect.bottom &&
      dinoRect.right > obstacleRect.left &&
      dinoRect.left < obstacleRect.right
    );
  
    // Verificar la colisión con el obstáculo aéreo si existe
    const aerialObstacleCollision = aerialObstacleRect && (
      dinoRect.bottom > aerialObstacleRect.top &&
      dinoRect.top < aerialObstacleRect.bottom &&
      dinoRect.right > aerialObstacleRect.left &&
      dinoRect.left < aerialObstacleRect.right
    );
  
    // Devolver verdadero si hay colisión con alguno de los obstáculos
    return obstacleCollision || aerialObstacleCollision;
  }
  

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over! Tiempo: ' + seconds + 's - Saltos: ' + jumps);
        location.reload(); // Recargar la página al chocar con el obstáculo
      } else {
        // Ajustar la velocidad del obstáculo según la variable obstacleSpeed
        obstacle.style.animation = `obstacleAnimation ${2 / obstacleSpeed}s linear infinite`;
        // Ajustar la velocidad del obstáculo aéreo según la variable obstacleSpeed
        if (aerialObstacle) {
          aerialObstacle.style.animation = `obstacleAnimation ${2 / aerialObstacleSpeed}s linear infinite`;
        }
        
        requestAnimationFrame(gameLoop);
  }
}


setInterval(updateTimer, 1000);

gameLoop();
