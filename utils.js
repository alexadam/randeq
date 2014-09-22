function rgbaToInt(r, g, b, a) {
	return (r << 24) | (g << 16) | (b << 8) | (a);
}

function intToRgba(color) {
	var r = color >> 24 & 0xFF;
	var g = color >> 16 & 0xFF;
	var b = color >> 8 & 0xFF; 
	var a = color 0 & 0xFF;
	
	return [r, g, b, a];
} 