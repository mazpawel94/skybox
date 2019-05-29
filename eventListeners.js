window.addEventListener("mousemove", () => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("wheel", e => {
    const sign = Math.sign(e.deltaY);
    updateSphericalCoordinates(activeBox);
    activeBox.userData.sphericalCoordinates.radius -= sign * 1;
    if (activeBox.userData.sphericalCoordinates.radius <= 5)
        activeBox.userData.sphericalCoordinates.radius = 5;
    activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
});

document.addEventListener("keydown", e => {
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
    createBox(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
    );
    const pixelX = Math.round(intersects[0].uv.x * 10012);
    const pixelY = Math.round(intersects[0].uv.y * 4303);
    console.log(10012 - pixelX, 4303 - pixelY);
    console.log(getPixel(10012 - pixelX, 4303 - pixelY));
});

document.addEventListener("click", e => {

    if (e.target.nodeName === "INPUT") return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(boxes);
    if (!intersects.length) return;
    setActiveBox(intersects[0].object);
    renderer.render(scene, camera);
    console.log(intersects[0].object.material.color);
})
