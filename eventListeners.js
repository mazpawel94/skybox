

window.addEventListener("mousemove", () => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // console.log(camera.position.x.toFixed(3));
});

window.addEventListener("wheel", e => {
    console.log("skrolujé");
    const sign = Math.sign(e.deltaY);
    updateSphericalCoordinates(activeBox);
    activeBox.userData.sphericalCoordinates.radius -= sign * 10;
    activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
});

document.addEventListener("keydown", e => {
    if (e.keyCode == 38) {
        // parentBox.rotation.z += 0.03 * Math.PI / 2;
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.phi -= Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
        activeBox.rotation.x -= Math.PI / 256;

        console.log(activeBox.position);
    }
    if (e.keyCode == 40) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.phi += Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
        activeBox.rotation.x += Math.PI / 256;
        console.log(activeBox.position);
    }
    if (e.keyCode == 37) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.theta += Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
        activeBox.rotation.y += Math.PI / 256;

        console.log(activeBox.position);
    }
    if (e.keyCode == 39) {
        updateSphericalCoordinates(activeBox);
        activeBox.userData.sphericalCoordinates.theta -= Math.PI / 256;
        activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
        activeBox.rotation.y -= Math.PI / 256;
        console.log(activeBox.position);
    }
    // renderer.render(scene, camera);
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

document.addEventListener("dblclick", e => {
    // scene.rotation.x = 20;
    // camera.rotation.x = 20;
    createBox(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
    );
});

// scope.domElement.addEventListener('wheel', onMouseWheel, false);
// scope.domElement.removeEventListener('wheel', onMouseWheel, false);