const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyElement = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
