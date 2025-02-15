import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.module.js';

// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Floating Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800; // More particles for a richer effect
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15; // Increased range for depth effect
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.05,
  transparent: true,
  opacity: 0.8,
  depthWrite: false, // Makes particles glow more
  blending: THREE.AdditiveBlending // Adds a neon glow effect
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

  // Rotate the particle field slightly
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;

  // Parallax effect (makes background move with mouse)
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// Responsive Window Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
