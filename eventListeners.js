

//create new box
document.addEventListener("dblclick", e => {
    if (e.target.nodeName === "INPUT") return;
    createBox(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
    );
});

//activate box
document.addEventListener("click", e => {
    if (e.target.nodeName === "INPUT") return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(boxes);
    if (!intersects.length) return;
    setActiveBox(intersects[0].object);
})

//move box in cartesian coordinates
window.addEventListener("mousemove", () => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (dragActive)
        controlMovement();
});

//stop move box in cartesian coordinates
document.addEventListener("mouseup", () => dragActive = false);

//change of depth box
window.addEventListener("wheel", e => {
    const sign = Math.sign(e.deltaY);
    activeBox.userData.sphericalCoordinates.radius -= sign * 1;
    activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    controlMovement();
});

//move box in spherical coordinates
document.addEventListener("keydown", e => {
    if (e.keyCode == 38)
        handleKeyDown('phi', -1);
    if (e.keyCode == 40)
        handleKeyDown('phi', 1);
    if (e.keyCode == 37)
        handleKeyDown('theta', 1);
    if (e.keyCode == 39)
        handleKeyDown('theta', -1);
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});


