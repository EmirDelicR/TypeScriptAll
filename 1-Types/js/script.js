"use strict";
let isDone = false;
let myNumber = 4;
let myName = "Emir";
let greeting1 = "Hello, " + myName;
let greeting2 = `Hello, ${myName}`;
let count = [1, 2, 3];
let array = ["1", "2"];
let anyType = 4;
anyType = "Ahmed";
const greeting = (name) => {
    console.log("Hello, " + name);
};
const sum = (a, b) => {
    return a + b;
};
let mySum;
mySum = sum;
let address = ["Address_1", 99];
let joystickStatus = 1;
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 0] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
    Directions[Directions["Left"] = 25] = "Left";
    Directions[Directions["Right"] = 26] = "Right";
})(Directions || (Directions = {}));
let myDirection = Directions.Right;
if (joystickStatus === Directions.Right) {
}
const userData = {
    name: "test",
    age: 22
};
const complex = {
    data: [1, 2, 3],
    output: function (all) {
        return this.data;
    }
};
const complex2 = {
    data: [1, 2, 3]
};
let test = 23;
let final = "String";
if (typeof final === "string") {
    console.log("Log only if is string");
}
const neverReturns = () => {
    throw new Error("An error");
};
const bankAccount = {
    money: 2000,
    deposit: function (value) {
        this.money += value;
    }
};
const mySelf = {
    name: "Test",
    bankAccount: bankAccount,
    hobbies: ["Sport", "Cooking"]
};
