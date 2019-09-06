/* Interfaces */

interface RectangleOptions {
  width: number;
  length: number;
  height?: number; // ?means optional can be or not
  [propName: string]: any; // This is property without specific name

  calc(width: number): number; // interface for function
}

// Interface is not visible in JS

const drawRectangle = (options: RectangleOptions) => {
  let width = options.width;
  let length = options.length;
  let coordinates = options.coordinates;
  console.log("This is coordinates: ", coordinates);

  if (options.height) {
    let height = options.height;
  }
  // Draw logic
};

const rectangle: RectangleOptions = {
  width: 50,
  length: 20,
  coordinates: [12, 13],

  calc(width: number) {
    return width * width;
  }
};

drawRectangle(rectangle);

/** Interfaces with class */

class Rectangle implements RectangleOptions {
  width: number = 0;
  length: number = 0;

  calc(width: number) {
    return this.width * this.width;
  }
}

/** Interfaces for function types */

interface DoubleValueFunc {
  (num1: number, num2: number): number;
}

const myDouble: DoubleValueFunc = (n1: number, n2: number) => (n1 + n2) * 2;

/** Interfaces inheritance */

interface Cube extends RectangleOptions {
  height: number; // in RectangleOptions is optional here is mandatory
}

const cube: Cube = {
  width: 20,
  length: 10,
  height: 15,

  calc(width: number) {
    return width * width;
  }
};
