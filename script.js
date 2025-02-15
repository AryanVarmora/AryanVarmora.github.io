import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.module.js';

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1"; // Ensures it stays behind content
document.body.appendChild(renderer.domElement);

// Create Floating Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000; // More particles for a richer effect
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20; // More space for depth effect
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00ffff, // Default bright cyan
  size: 0.05,
  transparent: true,
  opacity: 0.7,
  depthWrite: false,
  blending: THREE.AdditiveBlending // Adds a glowing effect
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse-based Parallax Effect (Smoother movement)
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the particle field slightly
  particlesMesh.rotation.y += 0.0008;
  particlesMesh.rotation.x += 0.0003;

  // Smooth Parallax Effect
  camera.position.x += (mouseX - camera.position.x) * 0.03;
  camera.position.y += (mouseY - camera.position.y) * 0.03;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// Responsive Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Ensure Dark Mode Toggle Works When Page Loads
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Function to update particles color
  function updateParticlesColor() {
    if (document.body.classList.contains("dark-mode")) {
      particlesMaterial.color.set(0xffffff); // White particles in Dark Mode
    } else {
      particlesMaterial.color.set(0x00ffff); // Cyan particles in Light Mode
    }
  }

  // Check User Preference in Local Storage
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
    updateParticlesColor();
  }

  // Toggle Dark Mode on Button Click
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save User Preference in Local Storage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      themeToggle.textContent = "🌙 Dark Mode";
    }

    // Update particles color
    updateParticlesColor();
  });
});
