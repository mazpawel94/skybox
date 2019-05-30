window.addEventListener("mousemove", () => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (dragActive) {
        updateSphericalCoordinates(activeBox);
        if (checkMaximumDeep(activeBox) + 10 < Math.round(activeBox.userData.sphericalCoordinates.radius))
            activeBox.visible = false;
        else
            activeBox.visible = true;
    }
});

const convertXYZToXY = coordinates => {
    const point = coordinates.normalize();
    const u = 0.5 + (Math.atan2(point.z, point.x)) / (2 * Math.PI);
    const v = 0.5 - Math.asin(point.y) / Math.PI;
    return ({
        pixelX: Math.round(u * 10012),
        pixelY: Math.round(v * 4303)
    })
}

const checkMaximumDeep = box => {
    const cube = new THREE.Mesh();
    cube.position.setFromSpherical({ radius: 255, phi: box.userData.sphericalCoordinates.phi, theta: box.userData.sphericalCoordinates.theta });
    const XY = convertXYZToXY(cube.position);
    const deep = getPixel(XY.pixelX, XY.pixelY);
    return deep === 0 ? 255 : deep;
}

window.addEventListener("wheel", e => {
    const sign = Math.sign(e.deltaY);
    let radius = Math.round(activeBox.userData.sphericalCoordinates.radius);
    updateSphericalCoordinates(activeBox);
    const deep = checkMaximumDeep(activeBox);
    if (radius <= deep || sign === 1)
        radius -= sign * 1;
    if (radius > deep + 10)
        activeBox.visible = false;
    else activeBox.visible = true;
    if (radius <= 5)
        activeBox.userData.sphericalCoordinates.radius = 5;
    activeBox.userData.sphericalCoordinates.radius = radius;
    activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);

});

document.addEventListener("keydown", e => {
    let radius = Math.round(activeBox.userData.sphericalCoordinates.radius);
    updateSphericalCoordinates(activeBox);
    const deep = checkMaximumDeep(activeBox);
    if (radius > deep + 10)
        activeBox.visible = false;
    else activeBox.visible = true;
    if (e.keyCode == 38) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.phi -= Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    }
    if (e.keyCode == 40) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.phi += Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    }
    if (e.keyCode == 37) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.theta += Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    }
    if (e.keyCode == 39) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.theta -= Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    }
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

document.addEventListener("dblclick", e => {
    if (e.target.nodeName === "INPUT") return;
    // const pixelX = Math.round(intersects[0].uv.x * 10012);
    // const pixelY = Math.round(intersects[0].uv.y * 4303);
    createBox(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
    );
});

document.addEventListener("click", e => {

    if (e.target.nodeName === "INPUT") return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(boxes);
    if (!intersects.length) return;
    setActiveBox(intersects[0].object);
    renderer.render(scene, camera);
})

document.addEventListener("mouseup", () => dragActive = false);