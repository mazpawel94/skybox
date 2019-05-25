const addLight = () => {
    const globalLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(globalLight);
};

const createSpace = () => {
    const viewGeometry = new THREE.SphereGeometry(255, 32, 32);
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

const createControlForBox = box => {
    const control = new THREE.TransformControls(
        camera,
        renderer.domElement
    );
    control.addEventListener("change", () =>
        renderer.render(scene, camera)
    );

    control.addEventListener("dragging-changed", function (event) {
        console.log(control);

        orbitControls.enabled = !event.value; //zablokowanie rozglądania się wokół
    });
    control.showX = true;
    control.showZ = false;
    control.attach(box);
    scene.add(control);
};

const createBox = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    createControlForBox(cube);
    scene.add(cube);

    renderer.render(scene, camera);
};