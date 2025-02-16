import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
import { DRONE } from './drone.js';  

// 🌌 Create 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 🎇 Glowing Grid Floor
const gridHelper = new THREE.GridHelper(100, 100, 0x00ffff, 0x00ffff);
gridHelper.material.opacity = 0.2;
gridHelper.material.transparent = true;
scene.add(gridHelper);

// 🚀 Load Drone Model
const loader = new GLTFLoader();
loader.load('../assets/drone.glb', function (gltf) {
    const drone = gltf.scene;
    drone.scale.set(1, 1, 1);
    drone.position.set(0, 3, 0);
    scene.add(drone);

    // 🎮 Enable Drone Controls
    DRONE.init(drone, camera);
}, undefined, function (error) {
    console.error('Error loading drone model:', error);
});

// 🌟 Lighting Effects
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
pointLight.position.set(0, 15, 0);
scene.add(pointLight);

// 🎮 Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// 🔄 Responsive Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
