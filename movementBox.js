const controlMovement = () => {
    updateSphericalCoordinates(activeBox);
    distanceFromObstacle = checkMaximumDeep(activeBox);
    distanceBoxFromCenter = Math.round(activeBox.userData.sphericalCoordinates.radius);
    if (distanceBoxFromCenter === distanceFromObstacle) {
        activeBox.position.set(previousPosition.x, previousPosition.y, previousPosition.z);
        updateSphericalCoordinates(activeBox);
        return;
    }
    if (distanceFromObstacle < distanceBoxFromCenter)
        activeBox.visible = false;
    else
        activeBox.visible = true;
    previousPosition = new THREE.Vector3().set(activeBox.position.x, activeBox.position.y, activeBox.position.z);
}

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

const handleKeyDown = (angleName, value) => {
    activeBox.userData.sphericalCoordinates[angleName] += value * Math.PI / 256;
    activeBox.position.setFromSpherical(activeBox.userData.sphericalCoordinates);
    controlMovement();
}

const setActiveBox = box => {
    box.material.color.setRGB(0, 1, 0);
    boxes.forEach(e => e !== box ? e.material.color.set(0x444444) : null);
    activeBox = box;
    activeBoxRadius = box.userData.sphericalCoordinates.radius;
}

const updateSphericalCoordinates = object => {
    object.userData.sphericalCoordinates = new THREE.Spherical().setFromCartesianCoords(object.position.x, object.position.y, object.position.z);
}
