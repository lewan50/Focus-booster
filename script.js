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
  const playerArea = document.getElementById('playerArea');
  let embedUrl = "";

  // 1. Check for Playlists (contains 'list=')
  if (url.includes("list=")) {
    const playlistId = url.split("list=")[1].split("&")[0];
    embedUrl = `https://www.youtube.com/embed?listType=playlist&list=${playlistId}&autoplay=1`;
  } 
  // 2. Check for Single Videos
  else if (url.includes("v=")) {
    const videoId = url.split("v=")[1].split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } 
  else if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  if (embedUrl) {
    playerArea.style.display = "block";
    playerArea.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        allow="autoplay; encrypted-media" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>`;
  } else {
    alert("Please paste a valid YouTube video or playlist link.");
  }
}
