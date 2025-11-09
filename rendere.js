const startBtn = document.querySelector(".btn-start");
const stopBtn = document.getElementById("btn-stop");
const resetBtn = document.getElementById("btn-reset");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const statusText = document.getElementById("status");

let initialMinutes = Number.parseInt(minutesDisplay.textContent);
let totalSeconds;
let interval = null;
let isRunning = false;

//Funcion para inicializar el tiempo segun el valro actual del HTML
function initTimer() {
  const sessionAmount = parseInt(minutesDisplay.textContent);
  totalSeconds = sessionAmount * 60;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(interval);
        isRunning = false;
      }
    }, 1000);
  }
  showStatus("Se inicio el pomodoro")
}

function stopTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    statusText.textContent = "Pomodoro Pausado";
    statusText.classList.add("show");

    showStatus("Se detuvo el pomodoro");
  }
}

function resetTimer() {
  clearInterval(interval); // 🔹 Detiene el temporizador si está corriendo
  totalSeconds = initialMinutes * 60;
  isRunning = false;
  showStatus("Pomodoro Reiniciado");
  updateDisplay();
}

function showStatus(message) {
  statusText.textContent = message;
  statusText.classList.add("show");

  setTimeout(() => {
    statusText.classList.remove("show");
    setTimeout(() => {
      statusText.textContent = "";
    }, 300);
  }, 2000);
}

initTimer();

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
