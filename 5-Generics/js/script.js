"use strict";
/** Generics */
/*
What to make this function without any
const echo = (data: any): any => {
  return data;
};
*/
const echo = (data) => {
    return data;
};
console.log(echo("Test"));
console.log(echo(27));
console.log(echo({ name: "Test", age: 27 }));
/** Build-in generic */
// Array is generic type by default
const testResults = [1.94, 2.33];
const printAll = (args) => {
    args.forEach(elem => console.log(elem));
};
printAll(["Test 1", "Test 2"]);
/** Generic Types */
/**
 * This is type <T>(data: T) => T
 *  <T> -> Generic Type
 *  (data: T) => T -> Function type
 *  (data: T) -> Argument of generic type
 *  => T -> Function will return generic Type
 *  */
const echoTwo = echo;
console.log(echoTwo("Testing"));
/** Generic Classes */
class SimpleMath {
    calculate() {
        return +this.baseValue * +this.multiplyValue;
    }
}
const simpleMath = new SimpleMath();
simpleMath.baseValue = "10";
simpleMath.multiplyValue = "15";
console.log(simpleMath.calculate());
/** Using multiple Generic Types in Classes */
/**
 * T extends U means that if we chose that U is number T must also be an number
 */
// class SimpleMathX<T extends U, U extends number | string> {
class SimpleMathX {
    calculate() {
        return +this.baseValue * +this.multiplyValue;
    }
}
const simpleMathX = new SimpleMathX();
simpleMathX.baseValue = 10;
simpleMathX.multiplyValue = "15";
console.log(simpleMath.calculate());
/** Exercise */
class MyMap {
    constructor() {
        // key si set up as optional name
        this.map = {};
    }
    setItem(key, item) {
        this.map[key] = item;
    }
    getItem(key) {
        return this.map[key];
    }
    clear() {
        this.map = {};
    }
    printMap() {
        console.log(this.map);
    }
}
const numberMap = new MyMap();
numberMap.setItem("apples", 5);
numberMap.setItem("bananas", 10);
numberMap.printMap();
const stringMap = new MyMap();
stringMap.setItem("name", "Max");
stringMap.setItem("age", "27");
stringMap.printMap();
