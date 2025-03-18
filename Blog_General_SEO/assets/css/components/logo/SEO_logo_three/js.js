import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let scene, camera, renderer, textMesh, particles, controls;
const loader = new FontLoader();

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x2962ff, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff88, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    createParticles();
    createText();

    camera.position.z = 8;

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById('textColor').addEventListener('input', updateTextColor);
    document.getElementById('particleColor').addEventListener('input', updateParticleColor);
    document.getElementById('particleSize').addEventListener('input', updateParticleSize);
    document.getElementById('particleCount').addEventListener('input', updateParticleCount);
    document.getElementById('rotationSpeed').addEventListener('input', updateRotationSpeed);
}

function createText() {
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
        const textGeometry = new TextGeometry('SEO', {
            font: font,
            size: 2,
            height: 1.5,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 0.4,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 16
        });

        const textMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2962ff,
            specular: 0xffffff,
            shininess: 100,
            emissive: 0x0044ff,
            emissiveIntensity: 0.3,
            metalness: 1,
            roughness: 0.2
        });

        textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.center();
        scene.add(textMesh);
    });
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
        // Posición en forma de esfera
        const radius = 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
        
        // Color gradiente
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

// Funciones de actualización
function updateTextColor(e) {
    if (textMesh) {
        textMesh.material.color.setStyle(e.target.value);
        textMesh.material.emissive.setStyle(e.target.value);
    }
}

function updateParticleColor(e) {
    if (particles) {
        const colors = particles.geometry.attributes.color;
        const color = new THREE.Color(e.target.value);
        
        for(let i = 0; i < colors.count; i++) {
            colors.setXYZ(i, color.r, color.g, color.b);
        }
        colors.needsUpdate = true;
    }
}

function updateParticleSize(e) {
    if (particles) {
        particles.material.size = parseFloat(e.target.value);
    }
}

function updateParticleCount(e) {
    if (particles) {
        scene.remove(particles);
        createParticles();
    }
}

let rotationSpeed = 0.005;
function updateRotationSpeed(e) {
    rotationSpeed = parseFloat(e.target.value);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (textMesh) {
        textMesh.rotation.y += rotationSpeed;
    }

    if (particles) {
        particles.rotation.y -= rotationSpeed * 0.5;
        particles.rotation.x -= rotationSpeed * 0.3;
    }

    controls.update();
    renderer.render(scene, camera);
}