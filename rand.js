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
	
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function anim() {
	draw(imageData);
	setTimeout(anim, 10);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
		    x = Math.round(Math.random() * width);
		    y = Math.round(Math.random() * height);
		    r = Math.round(Math.random() * 256);
		    g = Math.round(Math.random() * 256);
		    b = Math.round(Math.random() * 256);
		    setPixel(imageData, x, y, r, g, b, 255);
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