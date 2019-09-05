"use strict";
class Person {
    constructor(age, ...args) {
        [this.name, this.type] = args;
        this.age = age;
    }
    printAge() {
        console.log("Age: ", this.age);
        this.printType();
    }
    printType() {
        console.log("Type: ", this.type);
    }
    setType(type) {
        this.type = type;
    }
}
const person = new Person(25, "Test name", "Some type");
console.log(person);
person.printAge();
console.log("/** ######################################## */");
/** ######################################################################################### */
/** Inheritance */
class Test extends Person {
    constructor(age, type) {
        /** This will call parent class constructor */
        super(age, "Max", type);
        /** This will overwrite the parent class property */
        this.name = "Test";
        this._title = "General";
        /** age can be access here but type not */
        this.age = 24;
    }
    /** Setters */
    set title(value) {
        this._title = value;
    }
    /** Getter */
    get title() {
        return this._title;
    }
}
let test = new Test(23, "Other type");
console.log(test);
/** Use setter and getter on title */
test.title = "Some new title";
console.log(test.title);
console.log("/** ######################################## */");
/** ######################################################################################### */
/** Static properties and methods (not need to make an instance of class)*/
class Helper {
    static calculate(diameter) {
        return this.PI * diameter;
    }
}
Helper.PI = 3.14;
console.log("Static property: ", Helper.PI);
console.log("Static Method: ", Helper.calculate(2));
console.log("/** ######################################## */");
/** ######################################################################################### */
/* abstract class can not be instance only use as inheritance (not possible to use "new Animal") */
class Animal {
    constructor(theName) {
        this.petName = "Some pet name";
        this.name = theName;
    }
    walk(distance) {
        console.log(this.name + " walk " + distance);
    }
}
//inheritance
class Snake extends Animal {
    // ctor + tab --> shortcut for constructor
    constructor(theName) {
        super(theName); // call the constructor of a parent class
    }
    walk(distance) {
        console.log("Sneak don't really walk!");
    }
    changePetName(name) {
        this.petName = name;
    }
}
let snake = new Snake("Snipes");
snake.walk(22);
snake.changePetName("Super Snipes");
console.log(snake);
console.log("/** ######################################## */");
/** ######################################################################################### */
/** Private constructor and single tone */
class OnlyOne {
    /**
     * name the constructor is private and therefore cannot be access outside
     * of class OnlyOne
     */
    constructor(name) {
        this.name = name;
    }
    static getInstance() {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne("The Only One");
        }
        return OnlyOne.instance;
    }
}
// let wrong = new OnlyOne("The Only One");
let right = OnlyOne.getInstance();
/**
 *  getInstance method is a public method and therefore can be
 *  accessed without the need to instantiate a new instance
 * */
console.log(right);
console.log(right.name);
console.log("/** ######################################## */");
/** ######################################################################################### */
/* Exercise 1 */
class Car {
    constructor(name) {
        this.name = "Some name";
        this.acceleration = 0;
        this.name = name;
    }
    honk() {
        console.log("Toooooooooot!");
    }
    accelerate(speed) {
        this.acceleration += speed;
    }
}
var car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);
/* Exercise 2 - Two objects, based on each other ... */
class BaseObject {
    constructor(...args) {
        this.width = 0;
        this.length = 0;
        [this.width, this.length] = args;
    }
}
class Rectangle extends BaseObject {
    constructor(...args) {
        super(...args);
    }
    calcSize() {
        return this.width * this.length;
    }
}
const rect = new Rectangle(5, 2);
console.log(rect.calcSize());
/* Exercise 3 */
class TestPerson {
    constructor() {
        this._firstName = "";
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value.length > 3) {
            this._firstName = value;
        }
    }
}
let person_1 = new TestPerson();
console.log(person_1.firstName);
person_1.firstName = "Ma";
console.log(person_1.firstName);
person_1.firstName = "Master";
console.log(person_1.firstName);
