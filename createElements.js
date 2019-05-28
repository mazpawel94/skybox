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
    control.addEventListener("mousedown", () => console.log("klik"));
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
    cube.userData.sphereCoordinates = new THREE.Vector3(x, y, z);
    const distance = new THREE.Spherical().setFromCartesianCoords(x, y, z).radius;
    //przestawienie punktu z glebokosci 255 na 10
    cube.position.x = x / distance * 10;
    cube.position.y = y / distance * 10;
    cube.position.z = z / distance * 10;
    updateSphericalCoordinates(cube);
    setActiveBox(cube);
    createControlForBox(cube);
    parentBox.add(cube);
    boxes.push(cube);
    renderer.render(scene, camera);
};