var imageData;
var width;
var height;
var c;
var cellData;
var scale = 1;

function createImageData(canvasId) {
	element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(canvas).width();
	element.height = $(canvas).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	
	cellData = new Array(width * height);
	
	c.putImageData(imageData, 0, 0);
}

function drawParamEq(xeq, yeq, minVal, maxVal, step) {

	//clear canvas
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			setPixel(imageData, x, y, 255, 255, 255, 255);
		}
	}
	
	for (var t = parseFloat(minVal); t < parseFloat(maxVal); t+=parseFloat(step)) {
		var x = Math.abs(Math.round(width/2 + scale * evalRandEqT(t, xeq)));
		var y = Math.abs(Math.round(height/2 + scale * evalRandEqT(t, yeq)));
		
		setPixel(imageData, x, y, 255, 0, 0, 255);
	}
	
	c.putImageData(imageData, 0, 0);
	
	

}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}