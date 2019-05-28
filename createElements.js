const addLight = () => {
    const globalLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(globalLight);
};

const createSpace = () => {
    const viewGeometry = new THREE.SphereGeometry(256, 32, 32);
    const viewTexture = new THREE.TextureLoader().load("./panoramaINT.png");
    //   const texture2 = new THREE.TextureLoader().load("./panoramaDEP.png");
    //   console.log(texture2);

    const material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        map: viewTexture
    });
    const view = new THREE.Mesh(viewGeometry, material);
    scene.add(view);
};


const updateSphericalCoordinates = object => {
    object.userData.sphericalCoordinates = new THREE.Spherical().setFromCartesianCoords(object.position.x, object.position.y, object.position.z);
    console.log(object.userData.sphericalCoordinates);
}
const createControlForBox = box => {
    const control = new THREE.TransformControls(
        camera,
        renderer.domElement
    );
    control.addEventListener("change", () => {

        renderer.render(scene, camera)
    }
    );

    control.addEventListener("dragging-changed", function (event) {

        orbitControls.enabled = !event.value; //zablokowanie rozglądania się wokół
    });
    // control.showZ = false;
    control.attach(box);
    scene.add(control);
};

const createBox = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // cube.userData = { sphericalCoordinates: new THREE.Spherical().setFromCartesianCoords(x / 5, y / 5, z / 5) };
    cube.position.x = x / 5;
    cube.position.y = y / 5;
    cube.position.z = z / 5;
    updateSphericalCoordinates(cube);
    activeBox = cube;
    // const sphericalCoordinates = new THREE.Spherical().setFromCartesianCoords(x, y, z);
    console.log(cube.getWorldPosition());
    console.log(cube.userData.sphericalCoordinates.radius);
    // const r = Math.sqrt(x * x + y * y + z * z);
    // const phi = Math.acos(z / r);
    // const theta = Math.PI / 2 - Math.atan(z / distance); //arcus cotangens(x) = pi/2 - arcus tangens(x)
    // console.log("dystans:", r);
    createControlForBox(cube);
    parentBox.add(cube);

    renderer.render(scene, camera);
};