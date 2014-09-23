var cellData;

function getRandPixelsData() {
	cellData = new Array(width * height);
	
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var index = x + y * width;
			
			r = Math.round(Math.random() * 255);
		    g = Math.round(Math.random() * 255);
		    b = Math.round(Math.random() * 255);
		    
		    cellData[index] = (r << 24) + (g << 16) + (b << 8) + (255);
		    
		}
	}
}