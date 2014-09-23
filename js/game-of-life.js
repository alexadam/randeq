var imageData;
var width;
var height;
var c;
var oldCellData;
var newCellData;
var timer;

function createImageData(canvasId) {
	element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(window).width();
	element.height = $(window).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	
	oldCellData = new Array(width * height);
	newCellData = new Array(width * height);
	
	initCellData(initRandom);
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function setStartPattern(spattern) {
	if (timer) {
        clearTimeout(timer);
        timer = 0;
    }
	
	console.log(spattern);
	
	if (spattern == "random")
		initCellData(initRandom);
	else if (spattern == "sierpinski-carpet")
		initCellData(initSierpinskiCarpet);
	else if (spattern == "glider")
		initCellData(glider);
	
	anim();
}

function initCellData(func) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			newCellData[x + y * width] = func(x, y);
		}
	}
}

function initRandom(x, y) {
	r = Math.random() * 256;
	
	if (r < 10)
		return 1;
	
	return 0;
}	

function initSierpinskiCarpet(x, y) {
	while (x > 0 || y > 0) {// when either of these reaches zero the pixel is determined to be on the edge at that square level and must be filled
		if (x % 3 == 1 && y % 3 == 1) // checks if the pixel is in the center for the current square level
			return 0;
		x = Math.floor(x/3); // x and y are decremented to check the next larger square level
		y = Math.floor(y/3);
	}
	return 1; // if all possible square levels are checked and the pixel is not determined to be open it must be filled
}

function glider(x, y) {
	//var index = x + y * width;
	                                                                                      
	if ( x == 1 && y == 5)
		return 1;
	if ( x == 1 && y == 6)
		return 1;
	if ( x == 2 && y == 5)
		return 1;
	if ( x == 2 && y == 6)
		return 1;
	if ( x == 11 && y == 5)
		return 1;
	if ( x == 11 && y == 6)
		return 1;
	if ( x == 11 && y == 7)
		return 1;
	if ( x == 12 && y == 4)
		return 1;
	if ( x == 12 && y == 8)
		return 1;
	if ( x == 13 && y == 3)
		return 1;
	if ( x == 14 && y == 3)
		return 1;
	if ( x == 13 && y == 9)
		return 1;
	if ( x == 14 && y == 9)
		return 1;
	if ( x == 15 && y == 6)
		return 1;
	if ( x == 16 && y == 4)
		return 1;
	if ( x == 16 && y == 8)
		return 1;
	if ( x == 17 && y == 5)
		return 1;
	if ( x == 17 && y == 6)
		return 1;
	if ( x == 17 && y == 5)
		return 1;
	if ( x == 17 && y == 6)
		return 1;
	if ( x == 17 && y == 7)
		return 1;
	if ( x == 18 && y == 6)
		return 1;
	if ( x == 21 && y == 3)
		return 1;
	if ( x == 21 && y == 4)
		return 1;
	if ( x == 21 && y == 5)
		return 1;
	if ( x == 22 && y == 3)
		return 1;
	if ( x == 22 && y == 4)
		return 1;
	if ( x == 22 && y == 5)
		return 1;
	if ( x == 23 && y == 2)
		return 1;
	if ( x == 23 && y == 6)
		return 1;
	if ( x == 25 && y == 1)
		return 1;
	if ( x == 25 && y == 2)
		return 1;
	if ( x == 25 && y == 6)
		return 1;
	if ( x == 25 && y == 7)
		return 1;
	if ( x == 35 && y == 3)
		return 1;
	if ( x == 35 && y == 4)
		return 1;
	if ( x == 36 && y == 3)
		return 1;
	if ( x == 36 && y == 4)
		return 1;
	
	return 0;
}

function nextGen() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			index = x + y * width;
		
			/*
			 *     0|1|2
			 *     3| |4
			 *     5|6|7
			 */
			
			var nrOfNeighbors = 0;
			
			if (x > 0) {
				if (y > 0)
					nrOfNeighbors += oldCellData[x - 1 + (y - 1) * width];
					
				nrOfNeighbors += oldCellData[x - 1 + y * width];
				
				if (y < height - 1) 
					nrOfNeighbors += oldCellData[x - 1 + (y + 1) * width];
			}
			
			if (x < width - 1) {
				if (y > 0)
					nrOfNeighbors += oldCellData[x + 1 + (y - 1) * width];
				
				nrOfNeighbors += oldCellData[x + 1 + y * width];

				if (y < height - 1)
					nrOfNeighbors += oldCellData[x + 1 + (y + 1) * width];
			}
			
			if (y > 0)
				nrOfNeighbors += oldCellData[x + (y - 1) * width];
			
			if (y < height - 1)
				nrOfNeighbors += oldCellData[x + (y + 1) * width];
			
			
			if (oldCellData[index] == 1) {
				if (nrOfNeighbors == 2 || nrOfNeighbors == 3)
					newCellData[index] = 1;
				else 
					newCellData[index] = 0;
			} else {
				if (nrOfNeighbors == 3)
					newCellData[index] = 1;
			}
			
		}
	}
}

function anim() {
	draw(imageData);
	timer = setTimeout(anim, 100);
	oldCellData = newCellData.slice(0);
	nextGen();
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			index = x + y * width;

			if (newCellData[index] == 1)
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