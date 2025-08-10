const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let img = new Image();

const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");

document.getElementById("imageInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      drawMeme();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById("generateBtn").addEventListener("click", drawMeme);

function drawMeme() {
  if (!img.src || !canvas.width) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const fontSize = Math.floor(canvas.width / 10);
  ctx.font = `${fontSize}px Impact`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 20;
  ctx.textAlign = "center";

  ctx.textBaseline = "top";
  drawOutlinedText(topTextInput.value, canvas.width / 2, 10);

  ctx.textBaseline = "bottom";
  drawOutlinedText(bottomTextInput.value, canvas.width / 2, canvas.height - 10);
}

function drawOutlinedText(text, x, y) {
  const upper = text.toUpperCase();
  ctx.fillText(upper, x, y);
  ctx.strokeText(upper, x, y);
}

document.getElementById("downloadBtn").addEventListener("click", function() {
  if (!canvas.width || !canvas.height) return;

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
});

// Load audio elements
const hoverSound = new Audio('hover.mp3');
const clickSound = new Audio('click.mp3');

// Prevent delay by forcing load
hoverSound.load();
clickSound.load();

// Play sound safely
function playSound(sound) {
  // Required for Chrome autoplay policy
  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (e) {
    // Do nothing on error
  }
}

// Attach hover sound
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, input[type="file"]').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(hoverSound));
  });

  document.querySelectorAll('button').forEach(el => {
    el.addEventListener('click', () => playSound(clickSound));
  });
});

const bgm = new Audio('bgm.mp3');
bgm.loop = true;
bgm.volume = 0.4; // Adjust to taste

function startBGM() {
  bgm.play().catch(() => {
    // If autoplay fails, wait for interaction
    document.addEventListener('click', () => {
      bgm.play().catch(() => {});
    }, { once: true });
  });
}

// Start BGM when page is loaded
document.addEventListener('DOMContentLoaded', () => {
  startBGM();
});
