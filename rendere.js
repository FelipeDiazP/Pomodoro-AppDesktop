const startBtn = document.querySelector(".btn-start");
const stopBtn = document.getElementById("btn-stop");
const resetBtn = document.getElementById("btn-reset");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const statusText = document.getElementById("status");
const shortBreakBtn = document.querySelector(".btn-shortBreak");
const shortLongBtn = document.querySelector(".btn-shortLong");
const pomodoro = document.querySelector(".btn-pomodoro");

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
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;

  localStorage.setItem("pomodoroTime", totalSeconds);
}

minutesDisplay.addEventListener("input", () => {
  let value = minutesDisplay.textContent.replace(/\D/g, "").slice(0, 2);
  if (value === "") value = "0";

  minutesDisplay.textContent = value.padStart(2, "0");

  localStorage.setItem("timerMinutes", minutesDisplay.textContent);

  initialMinutes = parseInt(minutesDisplay.textContent);

  totalSeconds =
    parseInt(minutesDisplay.textContent) * 60 +
    parseInt(secondsDisplay.textContent);
});

secondsDisplay.addEventListener("input", () => {
  let value = secondsDisplay.textContent.replace(/\D/g, "").slice(0, 2);
  if (value === "") value = "0";
  if (parseInt(value) > 59) value = "59";

  secondsDisplay.textContent = value.padStart(2, "0");

  localStorage.setItem("timerSeconds", secondsDisplay.textContent);

  totalSeconds =
    parseInt(minutesDisplay.textContent) * 60 +
    parseInt(secondsDisplay.textContent);
});

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
        minutesDisplay.textContent = "05";
        secondsDisplay.textContent = "00";
        totalSeconds = parseInt(minutesDisplay.textContent) * 60;
        setTimeout(() => {
          startTimer();
        }, 1000);
      }
    }, 1000);
  }
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
  clearInterval(interval);
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

function descansos(type) {
  if (type === "Descanso pequeño") {
    minutesDisplay.textContent = "05";
    secondsDisplay.textContent = "00";
    totalSeconds = parseInt(minutesDisplay.textContent) * 60;
    updateDisplay();
    startTimer();
    showStatus("Descanso pequeño");
  } else if (type === "Descanso largo") {
    minutesDisplay.textContent = "10";
    secondsDisplay.textContent = "00";
    totalSeconds = parseInt(minutesDisplay.textContent) * 60;
    updateDisplay();
    startTimer();
    showStatus("Descanso grande");
  }
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
