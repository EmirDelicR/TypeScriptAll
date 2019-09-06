"use strict";
/* Interfaces */
// Interface is not visible in JS
const drawRectangle = (options) => {
    let width = options.width;
    let length = options.length;
    let coordinates = options.coordinates;
    console.log("This is coordinates: ", coordinates);
    if (options.height) {
        let height = options.height;
    }
    // Draw logic
};
const rectangle = {
    width: 50,
    length: 20,
    coordinates: [12, 13],
    calc(width) {
        return width * width;
    }
};
drawRectangle(rectangle);
/** Interfaces with class */
class Rectangle {
    constructor() {
        this.width = 0;
        this.length = 0;
    }
    calc(width) {
        return this.width * this.width;
    }
}
const myDouble = (n1, n2) => (n1 + n2) * 2;
const cube = {
    width: 20,
    length: 10,
    height: 15,
    calc(width) {
        return width * width;
    }
};
