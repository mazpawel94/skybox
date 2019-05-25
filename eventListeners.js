window.addEventListener("mousemove", () => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("wheel", e => {
    const sign = Math.sign(e.deltaY);
    camera.position.z += sign * 10;
    camera.position.y += sign * 10;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

document.addEventListener("keydown", e => {
    if (e.keyCode == 40) camera.position.z += 1;
    if (e.keyCode == 38) camera.position.z -= 1;
    renderer.render(scene, camera);
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

document.addEventListener("dblclick", e => {
    createBox(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
    );
});
