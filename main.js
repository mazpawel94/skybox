const mouse = new THREE.Vector2();
const parentBox = new THREE.Object3D();
const centerPoint = new THREE.Object3D();
parentBox.position = (0, 0, 0);
let activeBox, time = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = -1;
camera.enableZoom = false;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
let intersects = raycaster.intersectObjects(scene.children);

const orbitControls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

const r = 255;
let theta = 0;
let dTheta = 2 * Math.PI / 1000;

function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    // time += 0.005;
    // activeBox.position.x = Math.cos(time * 10) * 25;
    // // activeBox.position.y = Math.cos(time * 10) * 25;
    // activeBox.position.z = Math.cos(time * 8) * 25;
    // parentBox.rotation.x += 0.02;
    // activeBox.userData.sphericalCoordinates.radius += 0.1;
    // activeBox.userData.sphericalCoordinates.phi += dTheta;
    // activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    // activeBox.position.x = r * Math.cos(theta);
    // activeBox.position.z = r * Math.sin(theta);

    // theta += dTheta;
    renderer.render(scene, camera);
}
scene.add(parentBox);
scene.add(centerPoint);
console.log(centerPoint);
createBox(0, 0, r);
addLight();
createSpace();
animate();
