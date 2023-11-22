const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const aerialObstacle = document.getElementById('aerialObstacle');
const timeCounter = document.getElementById('timeCounter');
const jumpCounter = document.getElementById('jumpCounter');
const aerialObstacleSpeed = 0.57;

let jumps = 0;
let seconds = 0;
let obstacleSpeed = 1;
const initialObstacleSpeed = 1;
const maxObstacleSpeed = 1.6;

document.addEventListener('keydown', jump);



function jump(event) {
  if (event.code === 'Space' && !dino.classList.contains('jumping')) {
    dino.classList.add('jumping');
    dino.style.animation = 'jumpAnimation 1.2s forwards';

    jumps++;
    jumpCounter.textContent = jumps;

    setTimeout(() => {
      dino.style.animation = '';
      dino.classList.remove('jumping');
    }, 1200);
  }
}

function updateTimer() {
    seconds++;
    timeCounter.textContent = seconds;
  
    if (seconds % 10 === 0) {
      obstacleSpeed += 0.2;
  
      if (obstacleSpeed > maxObstacleSpeed) {
        obstacleSpeed = initialObstacleSpeed; // Restablecer la velocidad al valor inicial
      }

      if (Math.random() < 0.9) { // Probabilidad de 20%
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

// ... (Código existente)


  

setInterval(updateTimer, 1000);

gameLoop();
