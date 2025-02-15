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
const particlesCount = 1500; // Increased for a richer effect
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 30; // Increased depth range
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00ffff, // Bright cyan glow
  size: 0.05,
  transparent: true,
  opacity: 0.4, // Optimized for dark mode
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

// Dynamic Typing Effect for Hero Section
const textArray = ["an AI & ML Engineer", "a Software Developer", "a Researcher"];
let index = 0, charIndex = 0;
const typingText = document.getElementById("typing-text");

function typeText() {
    if (charIndex < textArray[index].length) {
        typingText.innerHTML += textArray[index][charIndex++];
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingText.innerHTML = textArray[index].slice(0, --charIndex);
        setTimeout(eraseText, 50);
    } else {
        index = (index + 1) % textArray.length;
        setTimeout(typeText, 1000);
    }
}

// Start Typing Effect
if (typingText) {
    typeText();
}

// Parallax Scrolling Effect
document.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    particlesMesh.position.y = scrollY * 0.005;
});

// Futuristic Cursor Glow Effect
const cursor = document.createElement("div");
cursor.style.width = "15px";
cursor.style.height = "15px";
cursor.style.borderRadius = "50%";
cursor.style.position = "absolute";
cursor.style.background = "cyan";
cursor.style.boxShadow = "0px 0px 10px cyan";
cursor.style.pointerEvents = "none";
cursor.style.transition = "transform 0.1s ease-out";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
