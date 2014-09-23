var openParens = 0;

function negop(val){
	return -val;
}

function randint(low, high) {
	return low + Math.round(Math.random() * high);
}

function isFunction(object) {
	return Object.prototype.toString.call(object) == '[object Function]';
}

function genRandFloatNumber(limits) {
	return limits[0] + Math.random() * limits[1];
}

function genRandIntNumber(limits) {
	return limits[0] + Math.round(Math.random() * limits[1]);
}

function getRandFromList(symbols) {
	if (symbols.length == 1)
		return symbols[0];
	return symbols[randint(0, symbols.length - 1)];
}
function endExp(exp) {
	if (openParens > 0) {
		openParens -= 1;
		return exp[0];
	}
	return "";
}

function genExp(symbols) {
	openParens += 1;
	return getRandFromList(symbols);
}

function ssm(maxIterations, states, rules) {
	var result = "";
	var currentState = "initial";
	currentState = getRandFromList(rules[currentState]);
	var iterations = 0;

	while (iterations < maxIterations || openParens > 0 || currentState != 'op') {
		
		var symbols = states[currentState];
		
		if (isFunction(symbols[0]))
			result += "" + (symbols[0](symbols.slice(1)));
		else
			result += "" + (getRandFromList(symbols));

		currentState = getRandFromList(rules[currentState]);
		iterations += 1;
	}
	
	return result;
}

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var exp = Math.exp;
var abs = Math.abs;
var log = Math.log;
var tan = Math.tan;
var neg = negop;

function genRandEq2(length) {
	var states = {
		"input" : [ "x", "y" ],
		"number" : [ genRandIntNumber, -10, 10 ],
		"float-number" : [ genRandFloatNumber, -10, 10 ],
		"op" : [ "+", "-", "*", "/", "|", "&", "^", "<<", ">>" ],
		"expr" : [ genExp, "(", "Math.sin(", "Math.cos(", "Math.sqrt(", "Math.exp(", "Math.abs(", "Math.log(", "Math.tan(" ],
		"endexp" : [ endExp, ")" ]
	};
	var rules = {
		"initial" : [ "input", "number", "float-number", "expr" ],
		"input" : [ "op", "endexp" ],
		"number" : [ "op", "endexp" ],
		"float-number" : [ "op", "endexp" ],
		"op" : [ "input", "number", "float-number", "expr" ],
		"expr" : [ "input", "number", "float-number", "expr" ],
		"endexp" : [ "op", "endexp" ]
	};
	
	return ssm(length, states, rules);
}

function genRandEq(length) {
	var states = {
		"input" : [ "x", "y" ],
		"number" : [ genRandIntNumber, 0, 10 ],
		"op" : [ "+", "-", "*", "/" ],
		"expr" : [ genExp, "neg(", "(", "sin(", "cos(", "sqrt(", "exp(", "abs(", "log(", "tan("],
		"endexp" : [ endExp, ")" ]
	};
	var rules = {
		"initial" : [ "input", "number", "expr" ],
		"input" : [ "op", "endexp" ],
		"number" : [ "op", "endexp" ],
		"op" : [ "input", "number", "expr" ],
		"expr" : [ "input", "number", "expr" ],
		"endexp" : [ "op", "endexp" ]
	};
	
	return ssm(length, states, rules);
}

function genRandEqT(length) {
	var states = {
		"input" : [ "t" ],
		"number" : [ genRandIntNumber, 0, 10 ],
		"op" : [ "+", "-", "*", "/" ],
		"expr" : [ genExp, "neg(", "(", "sin(", "cos(", "sqrt(", "exp(", "abs(", "log(", "tan("],
		"endexp" : [ endExp, ")" ]
	};
	var rules = {
		"initial" : [ "input", "number", "expr" ],
		"input" : [ "op", "endexp" ],
		"number" : [ "op", "endexp" ],
		"op" : [ "input", "number", "expr" ],
		"expr" : [ "input", "number", "expr" ],
		"endexp" : [ "op", "endexp" ]
	};
	
	return ssm(length, states, rules);
}

function evalRandEq(x, y, expr) {
	return eval(expr);
}

function evalRandEqT(t, expr) {
	return eval(expr);
}

function test() {
	consolgenRandEqog(randeq.js(30));
}
