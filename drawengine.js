var imageData;
var width;
var height;
var c;

function createImageData(canvasId) {
	element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(window).width();
	element.height = $(window).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	c.putImageData(imageData, 0, 0);
}

function engineDraw(cellData, plusAlpha) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			index = x + y * width;
			
			var r = cellData[index] >> 24 & 0xFF;
			var g = cellData[index] >> 16 & 0xFF;
			var b = cellData[index] >> 8 & 0xFF;
			var a = 255;
			if (plusAlpha)
				var a = cellData[index] & 0xFF;
			
		    setPixel(imageData, x, y, r, g, b, a);
		}
	}
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}