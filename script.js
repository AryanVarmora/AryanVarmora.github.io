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

// GSAP Animations for Smooth UI Transitions
document.addEventListener("DOMContentLoaded", () => {
  gsap.from("h1", { duration: 1, opacity: 0, y: -50, ease: "power3.out" });
  gsap.from("p", { duration: 1.2, opacity: 0, y: 30, delay: 0.2, ease: "power3.out" });
  gsap.from(".btn", { duration: 1.5, opacity: 0, scale: 0.8, delay: 0.5, ease: "back.out(1.7)" });
});

// Futuristic Cursor Glow Effect
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

// Scroll-Based Animations
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
      scrollTrigger: {
          trigger: section,
          start: "top 80%", 
          end: "bottom 50%",
          toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
  });
});

// Floating Dots in Background
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
