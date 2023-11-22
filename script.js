const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const timeCounter = document.getElementById('timeCounter');
const jumpCounter = document.getElementById('jumpCounter');

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
    }
  }

function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return (
    dinoRect.bottom > obstacleRect.top &&
    dinoRect.top < obstacleRect.bottom &&
    dinoRect.right > obstacleRect.left &&
    dinoRect.left < obstacleRect.right
  );
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over! Tiempo: ' + seconds + 's - Saltos: ' + jumps);
        location.reload(); // Recargar la página al chocar con el obstáculo
      } else {
        // Ajustar la velocidad del obstáculo según la variable obstacleSpeed
        obstacle.style.animation = `obstacleAnimation ${2 / obstacleSpeed}s linear infinite`;
        
        requestAnimationFrame(gameLoop);
  }
}

// ... (Código existente)

function createAerialObstacle() {
    const aerialObstacle = document.createElement('div');
    aerialObstacle.className = 'aerialObstacle';
    document.body.appendChild(aerialObstacle);
  
    const randomHeight = Math.random() * window.innerHeight / 2; // Altura aleatoria hasta la mitad de la ventana
    aerialObstacle.style.bottom = randomHeight + 'px';
  
    const aerialObstacleSpeed = 1.5; // Velocidad del obstáculo aéreo
    const animationDuration = window.innerWidth / aerialObstacleSpeed; // Duración basada en la velocidad y el ancho de la ventana
    aerialObstacle.style.animation = `aerialObstacleAnimation ${animationDuration}s linear infinite`;
  
    setTimeout(() => {
      aerialObstacle.remove();
    }, animationDuration * 1000); // Eliminar el obstáculo después de la duración de la animación
  }
  
  function updateTimer() {
    seconds++;
    timeCounter.textContent = seconds;
  
    if (seconds % 10 === 0) {
      obstacleSpeed += 0.9;
  
      if (obstacleSpeed > maxObstacleSpeed) {
        obstacleSpeed = initialObstacleSpeed; // Restablecer la velocidad al valor inicial
      }
  
      // Crear obstáculo aéreo ocasionalmente
      if (Math.random() < 0.2) { // Probabilidad de 20%
        createAerialObstacle();
      }
    }
  }
  

setInterval(updateTimer, 1000);

gameLoop();
