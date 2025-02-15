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
  color: 0x00ffff, // Bright cyan glow
  size: 0.05,
  transparent: true,
  opacity: 0.4,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse-based Parallax Effect
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.0007;
  particlesMesh.rotation.x += 0.0004;

  // Smooth Parallax Effect
  camera.position.x += (mouseX - camera.position.x) * 0.02;
  camera.position.y += (mouseY - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Ensure Dark Mode is Always Applied
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark-mode");
});

// 🟢 Dynamic Typing Effect for Hero Section
const textArray = ["an AI & ML Engineer", "a Software Developer", "a Researcher"];
let textIndex = 0, textCharIndex = 0;
const typingText = document.getElementById("typing-text");

function typeText() {
    if (textCharIndex < textArray[textIndex].length) {
        typingText.innerHTML += textArray[textIndex][textCharIndex++];
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (textCharIndex > 0) {
        typingText.innerHTML = textArray[textIndex].slice(0, --textCharIndex);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 1000);
    }
}

if (typingText) {
    typeText();
}

// Parallax Scrolling Effect
document.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    particlesMesh.position.y = scrollY * 0.005;
});

// 🟢 GSAP Animations for Smooth UI Transitions
document.addEventListener("DOMContentLoaded", () => {
  gsap.from("h1", { duration: 1, opacity: 0, y: -50, ease: "power3.out" });
  gsap.from("p", { duration: 1.2, opacity: 0, y: 30, delay: 0.2, ease: "power3.out" });
  gsap.from(".btn", { duration: 1.5, opacity: 0, scale: 0.8, delay: 0.5, ease: "back.out(1.7)" });
});

// 🟢 Futuristic Cursor Glow Effect
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power1.out",
    });
});

// 🟢 Floating Dots in Background
const floatingElements = [];
for (let i = 0; i < 20; i++) {
    let div = document.createElement("div");
    div.className = "floating-dot";
    document.body.appendChild(div);
    floatingElements.push(div);
}

floatingElements.forEach((dot) => {
    gsap.to(dot, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });
});

// 🟢 Hacker-Style Boot Up Text
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
