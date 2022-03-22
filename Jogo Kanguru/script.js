const kangu = document.querySelector('.kangu');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 100;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          kangu.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      kangu.style.bottom = position + 'px';
    }
  }, 20);
}
function createCereja() {
  const cereja = document.createElement('div');
  let cerejaPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cereja.classList.add('cereja');
  background.appendChild(cereja);
  cereja.style.left = cerejaPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cerejaPosition <-60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cereja);
    } else if (cerejaPosition > 0 && cerejaPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cerejaPosition -= 10;
      cereja.style.left = cerejaPosition + 'px';
    }
  }, 20);

  setTimeout(createCereja, randomTime);
}

createCereja();
document.addEventListener('keyup', handleKeyUp);