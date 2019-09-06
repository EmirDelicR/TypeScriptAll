"use strict";
/** Decorators */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Decorator is simple function that can be attached to something
 *
 */
const logged = (constructorFn) => {
    console.log(constructorFn);
};
/** Decorator attached to class */
let Person = class Person {
    constructor() {
        console.log("HI");
    }
};
Person = __decorate([
    logged
], Person);
/** Factory */
const logging = (value) => {
    return value ? logged : null;
};
let Car = class Car {
};
Car = __decorate([
    logging(false)
], Car);
/** Advance */
const printable = (constructorFn) => {
    constructorFn.prototype.print = function () {
        console.log(this);
    };
};
/** Using multiple decorators */
let Plant = class Plant {
    constructor() {
        this.name = "Green Plant";
    }
};
Plant = __decorate([
    logging(true),
    printable
], Plant);
const plant = new Plant();
plant.print();
/** Method Decorator */
const editable = (value) => {
    return (target, propName, descriptor) => {
        descriptor.writable = value;
    };
};
/** Property decorator */
const overwrite = (value) => {
    return (target, propName) => {
        const newDescriptor = {
            writable: value
        };
        return newDescriptor;
    };
};
class Project {
    constructor(name) {
        this.name = "Test";
        this.name = name;
    }
    calcBudget() {
        console.log(1000);
    }
}
__decorate([
    overwrite(true)
], Project.prototype, "name", void 0);
__decorate([
    editable(true)
], Project.prototype, "calcBudget", null);
const project = new Project("Super project");
project.calcBudget();
project.calcBudget = () => console.log(2000);
project.calcBudget();
console.log(project);
/** Parameter decorator */
const printInfo = (target, methodName, parentIndex) => {
    console.log("Target: ", target);
    console.log("Method: ", methodName);
    console.log("Index: ", parentIndex);
};
class Course {
    constructor(name) {
        this.name = "";
        this.name = name;
    }
    print(mode, printAll) {
        let num = 1000;
        if (printAll) {
            num = 1500;
        }
        console.log(num);
    }
}
__decorate([
    __param(1, printInfo)
], Course.prototype, "print", null);
const course = new Course("Test Curse");
course.print("mode", true);
