let totalSeconds = 0;
let interval = null;
let running = false;

function toggleTimer() {
  if (running) {
    clearInterval(interval);
    running = false;
    document.getElementById('startBtn').innerText = "Resume";
  } else {
    if (totalSeconds === 0) {
      const h = parseInt(document.getElementById('h').value) || 0;
      const m = parseInt(document.getElementById('m').value) || 0;
      const s = parseInt(document.getElementById('s').value) || 0;
      totalSeconds = (h * 3600) + (m * 60) + s;
    }
    
    if (totalSeconds > 0) {
      running = true;
      document.getElementById('startBtn').innerText = "Pause";
      interval = setInterval(updateTimer, 1000);
    }
  }
}

function updateTimer() {
  if (totalSeconds <= 0) {
    clearInterval(interval);
    alert("Session Complete!");
    resetTimer();
    return;
  }
  totalSeconds--;
  
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  
  document.getElementById('display').innerText = `${h}:${m}:${s}`;
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  totalSeconds = 0;
  document.getElementById('display').innerText = "00:00:00";
  document.getElementById('startBtn').innerText = "Start Focus";
}

function loadMusic() {
  const url = document.getElementById('ytUrl').value;
  let videoId = "";

  // Support for standard and mobile/short links
  if (url.includes("v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  if (videoId) {
    const playerArea = document.getElementById('playerArea');
    playerArea.style.display = "block";
    // Adding referrerpolicy fixes the 2026 configuration error
    playerArea.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        allow="autoplay; encrypted-media" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>`;
  } else {
    alert("Please paste a valid YouTube URL.");
  }
}