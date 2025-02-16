import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/controls/OrbitControls.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Grid Helper (Cyberpunk Grid Floor)
const gridHelper = new THREE.GridHelper(50, 50, 0x00ffff, 0x00ffff);
gridHelper.position.y = -0.1;
scene.add(gridHelper);

// Drone Model (Basic Sphere for Now)
const droneGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const droneMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.7 });
const drone = new THREE.Mesh(droneGeometry, droneMaterial);
drone.position.set(0, 2, 0);
scene.add(drone);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
pointLight.position.set(5, 10, 5);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Keyboard Controls
const keys = { w: false, s: false, a: false, d: false, space: false, shift: false };
document.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
document.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Drone Movement
    if (keys.w) drone.position.z -= 0.1;
    if (keys.s) drone.position.z += 0.1;
    if (keys.a) drone.position.x -= 0.1;
    if (keys.d) drone.position.x += 0.1;
    if (keys.space) drone.position.y += 0.1;
    if (keys.shift) drone.position.y -= 0.1;

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
