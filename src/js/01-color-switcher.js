function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;
let isRunning = false;

startButton.addEventListener('click', () => {
  if (isRunning) {
    return;
  }

  isRunning = true;
  startButton.disabled = true;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  isRunning = false;
  startButton.disabled = false;

  // Clear the interval using the stored interval ID
  clearInterval(intervalId);
});
