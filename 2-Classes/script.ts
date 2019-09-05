class Person {
  /** By default is public */
  name: string;
  /** Can be access only by this class */
  private type: string;
  /** Can be access also by classes that inherited this class */
  protected age: number;

  constructor(age: number, ...args: string[]) {
    [this.name, this.type] = args;
    this.age = age;
  }

  printAge() {
    console.log("Age: ", this.age);
    this.printType();
  }

  private printType() {
    console.log("Type: ", this.type);
  }

  setType(type: string) {
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
  /** This will overwrite the parent class property */
  name: string = "Test";
  private _title: string = "General";

  constructor(age: number, type: string) {
    /** This will call parent class constructor */
    super(age, "Max", type);
    /** age can be access here but type not */
    this.age = 24;
  }

  /** Setters */
  set title(value: string) {
    this._title = value;
  }
  /** Getter */
  get title(): string {
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
  static PI: number = 3.14;

  static calculate(diameter: number): number {
    return this.PI * diameter;
  }
}

console.log("Static property: ", Helper.PI);
console.log("Static Method: ", Helper.calculate(2));
console.log("/** ######################################## */");
/** ######################################################################################### */

/* abstract class can not be instance only use as inheritance (not possible to use "new Animal") */
abstract class Animal {
  private name: string;
  protected petName: string = "Some pet name";

  constructor(theName: string) {
    this.name = theName;
  }

  abstract changePetName(name: string): void;

  walk(distance: number) {
    console.log(this.name + " walk " + distance);
  }
}

//inheritance
class Snake extends Animal {
  // ctor + tab --> shortcut for constructor
  constructor(theName: string) {
    super(theName); // call the constructor of a parent class
  }

  walk(distance: number) {
    console.log("Sneak don't really walk!");
  }

  changePetName(name: string) {
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
   * Can only be accessed from a method that is not private from outside.
   * Also note that 'OnlyOne' here is a type!
   */
  private static instance: OnlyOne;
  /**
   * name the constructor is private and therefore cannot be access outside
   * of class OnlyOne
   */
  private constructor(public readonly name: string) {}

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
  name: string = "Some name";
  acceleration: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  honk() {
    console.log("Toooooooooot!");
  }

  accelerate(speed: number) {
    this.acceleration += speed;
  }
}
var car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);

/* Exercise 2 - Two objects, based on each other ... */

abstract class BaseObject {
  width: number = 0;
  length: number = 0;
  constructor(...args: number[]) {
    [this.width, this.length] = args;
  }
}

class Rectangle extends BaseObject {
  constructor(...args: number[]) {
    super(...args);
  }

  calcSize(): number {
    return this.width * this.length;
  }
}
const rect = new Rectangle(5, 2);
console.log(rect.calcSize());

/* Exercise 3 */

class TestPerson {
  private _firstName: string = "";

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
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
