const addLight = () => {
    const globalLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(globalLight);
};

const createSpace = () => {
    const viewGeometry = new THREE.SphereGeometry(256, 32, 32);
    const viewTexture = new THREE.TextureLoader().load("./panoramaINT.png");
    const deepTexture = new THREE.TextureLoader().load("./panoramaDEP.png");
    const material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        map: viewTexture
    });
    const material2 = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        map: deepTexture
    });
    const view = new THREE.Mesh(viewGeometry, material);
    scene.add(view);
    console.log(material.map);
};

const setActiveBox = box => {
    box.material.color.setRGB(0, 1, 0);
    boxes.forEach(e => e !== box ? e.material.color.setRGB(0, 0, 1) : null);
    activeBox = box;
}

const updateSphericalCoordinates = object => {
    object.userData.sphericalCoordinates = new THREE.Spherical().setFromCartesianCoords(object.position.x, object.position.y, object.position.z);
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
    const geometry = new THREE.BoxGeometry(boxLength.value, boxWidth.value, boxHeight.value);
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    cube.userData.sphereCoordinates = new THREE.Spherical().setFromCartesianCoords(x, y, z);
    cube.userData.sphereCoordinates.radius = 10;
    cube.position.setFromSpherical(cube.userData.sphereCoordinates);
    updateSphericalCoordinates(cube);
    setActiveBox(cube);
    createControlForBox(cube);
    scene.add(cube);
    boxes.push(cube);
    renderer.render(scene, camera);
};