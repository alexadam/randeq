from PIL import Image
from random import randint

def randomFunc():
    return randint(0, 1)

def randomFunc2():
    import time
    return int(round(time.time() * 10000)) % 2

def generate(fileName, width, height, randfunc):
    newImage = Image.new('RGB', (width, height))
    pixels = newImage.load()
    
    for y in range(height):
        for x in range(width):
            color = 255
            if randfunc() == 0:
                color = 0 
            pixels[x, y] = (color, color, color) 

    newImage.save(fileName)

if __name__ == '__main__':
    generate('randmap.png', 200, 200, randomFunc)