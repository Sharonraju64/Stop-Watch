const timeDisplay = document.querySelector('.time');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.querySelector('.laps');

let startTime;
let intervalId;
let elapsedTime = 0;

function updateTime() {
  const currentTime = Date.now();
  const deltaTime = currentTime - startTime + elapsedTime;
  const time = new Date(deltaTime);

  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0');

  timeDisplay.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

startBtn.addEventListener('click', () => {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTime, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  timeDisplay.textContent = '00:00.00';
  elapsedTime = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  const lapTime = timeDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
});
