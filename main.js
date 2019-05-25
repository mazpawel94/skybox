const mouse = new THREE.Vector2();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = -1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
let intersects = raycaster.intersectObjects(scene.children);

const orbitControls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    renderer.render(scene, camera);
}
animate();
addLight();
createSpace();
createBox(0, 0, 50);
createBox(0, 0, -50);