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

function loadSavedTimer() {
  const savedTime = localStorage.getItem("pomodoroTime");
  const savedMinutes = localStorage.getItem("timerMinutes");
  const savedSeconds = localStorage.getItem("timerSeconds");

  if (savedMinutes !== null && savedSeconds !== null) {
    // Si guardaste minutos y segundos manuales
    minutesDisplay.textContent = savedMinutes.padStart(2, "0");
    secondsDisplay.textContent = savedSeconds.padStart(2, "0");
    totalSeconds = parseInt(savedMinutes) * 60 + parseInt(savedSeconds);
    initialMinutes = parseInt(savedMinutes);
  } else if (savedTime !== null) {
    // Si solo existe el timer en segundos
    totalSeconds = parseInt(savedTime);
    initialMinutes = Math.floor(totalSeconds / 60);
  } else {
    // Si nunca había un timer guardado
    totalSeconds = initialMinutes * 60;
  }

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
    showStatus("Inicio de pomodoro 🍅");
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

  // 👉 Guardar el reset
  localStorage.setItem("pomodoroTime", totalSeconds);
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
shortBreakBtn.addEventListener("click", () => descansos("Descanso pequeño"));
shortLongBtn.addEventListener("click", () => descansos("Descanso largo"));

//Spotify Playlist
const playlistUser = document.getElementById("spotifyUrl");
const loadPlaylist = document.getElementById("loadPlaylist");
const container = document.querySelector(".container-spotify");

const defaultPlaylist =
  "https://open.spotify.com/embed/playlist/60vGmtm4LpFp57PrBdfDEr";

loadSavedTimer();

const savedPlayList = localStorage.getItem("PlayList");

container.innerHTML = `
  <iframe 
    src="${savedPlayList ? savedPlayList : defaultPlaylist}"
    frameborder="0"
    allow="encrypted-media"
  ></iframe>
`;

loadPlaylist.addEventListener("click", () => {
  let url = playlistUser.value.trim();

  if (!url) return;

  if (url.includes("open.spotify.com/")) {
    url = url.replace("open.spotify.com/", "open.spotify.com/embed/");

    localStorage.setItem("PlayList", url);

    container.innerHTML = `
      <iframe 
        src="${url}"
        allow="encrypted-media"
      ></iframe>
    `;

    showStatus("Se cargó correctamente");
  } else {
    showStatus("Ingresar link válido");
  }
});

//Menu
const btnMenu = document.getElementById("menu");
const panelMenu = document.getElementById("panel-menu");

btnMenu.addEventListener("click", () => {
  panelMenu.classList.toggle("hidden");
});
