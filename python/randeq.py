#!/usr/bin/python
from __future__ import division
from PIL import Image
from random import randint
import math
import sys
import types

openParens = 0

def genRandFloatNumber(limits):
    return 1/randint(limits[0], limits[1])

def genRandIntNumber(limits):
    return randint(limits[0], limits[1])

def getRandFromList(symbols):
    if len(symbols) == 1:
        return symbols[0]
    return symbols[randint(0, len(symbols) - 1)]

def endExp(exp):
    global openParens
    if openParens > 0:
        openParens -= 1
        return exp[0]
    return ''

def genExp(symbols):
    global openParens
    openParens += 1;
    
    return getRandFromList(symbols)

def ssm(maxIterations, states, rules):
    global openParens
    result = ''
    currentState = 'initial'
    
    currentState = getRandFromList(rules.get(currentState))
    iterations = 0
    
    while iterations < maxIterations or openParens > 0 or currentState != 'op':
        symbols = states.get(currentState)
        
        if isinstance(symbols[0], types.FunctionType):
            result += str(symbols[0](symbols[1:]))
        else:
            result += str(getRandFromList(symbols))
        
        currentState = getRandFromList(rules.get(currentState))    
        iterations += 1;
        
    return result

def gen():
    states = {'input' : ['x', 'y'], 
              'number' : [genRandIntNumber, 1, 10] ,
              'op' : ['+', '-', '*', '/'], 
              'expr' : [genExp, '(', 'math.sin(', 'math.cos(', 'math.sqrt('], 
              'endexp' : [endExp, ')']}
    rules = {'initial' : ['input', 'number', 'expr'], 
             'input' : ['op', 'endexp'], 
             'number' : ['op', 'endexp'], 
             'op' : ['input', 'number', 'expr'], 
             'expr' : ['input', 'number', 'expr'], 
             'endexp' : ['op', 'endexp']}
    
    return ssm(20, states, rules)

def scale(nr, x, y, width, height):
    if nr == 0:
        return x, y
    if nr == 1:
        return float(x - width / 2), float(y - height / 2)
    if nr == 2:
        return float(x - width / 2) / width, float(y - height / 2) / height

def comp(x, y, width, height, funcStr, scaleNr): 
    try:
        x, y = scale(scaleNr, x, y, width, height)
        
        red, green, blue = 0,0,0

        if funcStr[0] is not None:
            red = int(eval(funcStr[0]) * 100) % 255
            
        if len(funcStr) == 1:
            return (red, 0, 0)
        
        if funcStr[1] is not None:
            green = int(eval(funcStr[1]) * 1) % 255
            
        if len(funcStr) == 2:
            return (red, green, 0)
        
        if funcStr[2] is not None:
            blue = int(eval(funcStr[2]) * 1) % 255
        
        return (red, green, blue)
    except:
#         print sys.exc_info()[0]
        return (0, 0, 0) 
    
def mandelbrot(x, y, width, height, funcStr, scaleNr):
    maxIteration = 1000
    x = 4 * float(x - width / 2) / width -1
    y = 4 * float(y - height / 2) / height
    a = 0
    b = 0
    iteration = 0

    while (a ** 2 + b ** 2 <= 4 and iteration < maxIteration):
        iteration += 1
        tempa = a
#         a = a ** 2 - b ** 2 +  x / 1.5
#         b =  tempa * b + y #2 * 
        try:
            a = a ** 2 - b ** 2 +  x
            b = 2 * tempa * b + y
        except:
            continue
        
    if iteration == maxIteration:
        colorValue = 255
    else:
        colorValue = (iteration * 172) % 255
        
    return (colorValue, colorValue % 172, colorValue % 13)

def randomFunc(x, y, width, height, funcStr, scaleNr):
    col = randint(0, 1) * 255
    return (col, col, col)

def plot(fileName, width, height, genFunction, funcStr, scaleNr):
    newImage = Image.new('RGB', (width, height))
    pixels = newImage.load()
    
    for y in range(height):
        for x in range(width):
            pixels[x, y] = genFunction(x, y, width, height, funcStr, scaleNr) #(color, color, color) 

    newImage.save(fileName)
    
if __name__ == '__main__':
    fStr = [gen(), gen(), gen()]
    #'math.cos(3.14*math.sin(3.14*y*math.cos(3.14*math.cos(3.14*x)))*math.sin(3.14*y*math.cos(3.14*x*y)*y))'
    #'5*math.sin(x*math.sqrt(math.cos(x)))/y*math.sqrt((x)-y)',
    #'math.sqrt(y-x)*y-6+x' ]
    #math.sqrt(x-7)-y*x-6*((x)-y)
    print fStr
    for i in range(3):
        plot(str(i) + '_output.png', 500, 500, comp, fStr, i)