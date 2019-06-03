let imagedata, depthData;
const loader = new THREE.ImageLoader();
loader.load("./panoramaDEP.png", function (image) {
    imagedata = getImageData(image);
    depthData = imagedata.data;
    console.log(depthData);
    readDepth();
});

const getImageData = image => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
}

function getPixel(x, y) {
    const position = (x + imagedata.width * y) * 4;
    return depthData[position];
}

const depthValues = [];
const readDepth = () => {
    for (i = 0; i < imagedata.width; i++) {
        for (j = 0; j < imagedata.height; j++) {
            depthValues.push(getPixel(i, j));
        }
    }
    console.log(depthValues[20], depthValues[50], depthValues.length);
}

