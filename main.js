import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.module.js';

// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1"; // Keeps it in the background
document.body.appendChild(renderer.domElement);

// Create Floating Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 30;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00ffff, 
  size: 0.05,
  transparent: true,
  opacity: 0.4,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.0007;
  particlesMesh.rotation.x += 0.0004;
  renderer.render(scene, camera);
}
animate();

// Window Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Ensure Dark Mode is Always Applied
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark-mode");
});

// =========================
//  🟢 MATRIX FALLING CODE EFFECT
// =========================

// Create Matrix Canvas
const matrixCanvas = document.createElement("canvas");
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;
matrixCanvas.style.position = "fixed";
matrixCanvas.style.top = "0";
matrixCanvas.style.left = "0";
matrixCanvas.style.zIndex = "-2"; // Keeps it behind everything
document.body.appendChild(matrixCanvas);

const ctx = matrixCanvas.getContext("2d");

// Matrix Code Configuration
const columns = Math.floor(window.innerWidth / 14);
const drops = Array(columns).fill(0);
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const fontSize = 14;

// Matrix Animation
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Start Matrix Effect
setInterval(drawMatrix, 50);

// Adjust Canvas on Resize
window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
});

// =========================
// 🟢 Hacker-Style Boot Up Text
// =========================
const terminalLines = [
  "Booting up Aryan's AI Engine...",
  "Initializing neural networks...",
  "Loading machine learning models...",
  "Compiling futuristic animations...",
  "Enabling dark mode environment...",
  "Connecting to GitHub projects...",
  "Fetching AI datasets...",
  "Authentication successful ✅",
  "Welcome to Aryan's Portfolio Terminal!"
];

let terminalIndex = 0, terminalCharIndex = 0;
const terminalText = document.getElementById("terminal-text");
const terminalScreen = document.getElementById("terminal-screen");

function typeTerminalText() {
  if (terminalIndex < terminalLines.length) {
      if (terminalCharIndex < terminalLines[terminalIndex].length) {
          terminalText.innerHTML += terminalLines[terminalIndex].charAt(terminalCharIndex);
          terminalCharIndex++;
          setTimeout(typeTerminalText, 50);
      } else {
          terminalText.innerHTML += "\n";
          terminalCharIndex = 0;
          terminalIndex++;
          setTimeout(typeTerminalText, 500);
      }
  } else {
      // After last line, fade out terminal and reveal site
      setTimeout(() => {
          terminalScreen.style.transition = "opacity 1s ease-out";
          terminalScreen.style.opacity = "0";
          setTimeout(() => { terminalScreen.style.display = "none"; }, 1000);
      }, 1000);
  }
}

// Start the typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  typeTerminalText();
});
