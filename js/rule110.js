var imageData;
var width;
var height;
var c;
var cellData;

function createImageData(canvasId) {
	element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(window).width();
	element.height = $(window).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	
	cellData = new Array(width * height);
	
	initCellData();
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function initCellData() {
	for (var x = 0; x < width; x++) {
		r = Math.random() * 256;

		if (r < 30)
			cellData[x] = 1;
		else
			cellData[x] = 0;
	}
}

function continueCellData() {
	for (var x = 0; x < width; x++) {
		cellData[x] = cellData[x + (height - 1) * width];
	}
}

function nextGen() {
	
	for (var y = 1; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var index = x + y * width;
		
			/*
			 *     0|1|2
			 */
			
			var n0 = 0, n1 = 0, n2 = 0;
			
			if (x > 0) {
				n0 = cellData[x - 1 + (y - 1) * width];
				n1 = cellData[x + (y - 1) * width];
			
				if (x < width - 1)
					n2 = cellData[x + 1 + (y - 1) * width];
			} else if (x == 0) {
				n0 = 0;
				n1 = cellData[x + (y - 1) * width];
				n2 = cellData[x + 1 + (y - 1) * width];
			
			} else if (x == width - 1) {
				n0 = cellData[x - 1 + (y - 1) * width];
				n1 = cellData[x + (y - 1) * width];
				n2 = 0;
			}
	
			var state = 4 * n0 + 2 * n1 + 1 * n2;
			
			if (state == 7)
				cellData[index] = 0;
			else if (state == 6)
				cellData[index] = 1;
			else if (state == 5)
				cellData[index] = 1;
			else if (state == 4)
				cellData[index] = 0;
			else if (state == 3)
				cellData[index] = 1;
			else if (state == 2)
				cellData[index] = 1;
			else if (state == 1)
				cellData[index] = 1;
			else if (state == 0)
				cellData[index] = 0;
		}
	}
}

function anim() {
	draw(imageData);
	setTimeout(anim, 1000);
	nextGen();
	continueCellData();
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			index = x + y * width;

			if (cellData[index] == 1)
				setPixel(imageData, x, y, 0, 0, 0, 255);
			else
				setPixel(imageData, x, y, 255, 255, 255, 255);
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