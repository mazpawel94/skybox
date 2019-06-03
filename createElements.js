const addLight = () => {
    const globalLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(globalLight);
};

const createSpace = () => {
    const textureLoader = new THREE.TextureLoader();
    const customUniforms = {
        texture1: { type: "t", value: textureLoader.load("./panoramaINT.png") }
    };
    const viewGeometry = new THREE.SphereGeometry(255, 32, 32);
    const viewTexture = new THREE.TextureLoader().load("./panoramaINT.png");
    const material = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide,
        // map: viewTexture
    });
    material.extensions.fragDepth = true;
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
    control.addEventListener("dragging-changed", (e) => {
        dragActive = true;
        orbitControls.enabled = !e.value;
    });
    control.attach(box);
    scene.add(control);
};




const normalizeDepth = depth => {
    const newDepth = Math.abs(depth) / 256;
    console.log(newDepth);
    return newDepth;
}



const createBox = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(boxLength.value, boxWidth.value, boxHeight.value);
    // const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const material = new THREE.ShaderMaterial({
        uniforms: {
            depth: { value: 0.4 },
            color: { value: new THREE.Vector4(0.0, 1.0, 0.0, 1.0) }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader2').textContent,

    });
    material.extensions.fragDepth = true;
    const cube = new THREE.Mesh(geometry, material);
    cube.userData.sphericalCoordinates = new THREE.Spherical().setFromCartesianCoords(x, y, z);
    // move box from end of scene to distance ~50cm from the center
    cube.userData.sphericalCoordinates.radius = 7;
    cube.position.setFromSpherical(cube.userData.sphericalCoordinates);
    updateSphericalCoordinates(cube);
    setActiveBox(cube);
    createControlForBox(cube);
    scene.add(cube);
    boxes.push(cube);
};