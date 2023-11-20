function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function init() {
  const body = document.querySelector('body');
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  let intervalId;
  let isRunning = false;

  startButton.disabled = false;
  stopButton.disabled = true;

  startButton.addEventListener('click', () => {
    if (isRunning) {
      return;
    }

    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener('click', () => {
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
  });
}

// Виклик функції після завантаження сторінки
window.addEventListener('load', init);
