/* Boolean */
let isDone: boolean = false;

/* Number */
let myNumber: number = 4;

/* Text, string */
let myName: string = "Emir";

/* Template strings */
let greeting1: string = "Hello, " + myName;
let greeting2: string = `Hello, ${myName}`;

/* Arrays */
let count: Array<number> = [1, 2, 3];
// OR
let array: string[] = ["1", "2"];

/* Any type */
let anyType: any = 4;
anyType = "Ahmed";

/* Returning nothing */
const greeting = (name: string): void => {
  console.log("Hello, " + name);
};

/* Returning something */
const sum = (a: number, b: number): number => {
  return a + b;
};

/** Function types */
let mySum: (c: number, d: number) => number;
mySum = sum;

/* Tuples */
let address: [string, number] = ["Address_1", 99];

/* Enums */
let joystickStatus = 1;
enum Directions {
  Up,
  Down,
  Left = 25,
  Right
} // = {0, 1, 25, 26}

let myDirection: Directions = Directions.Right;
// Output is: 26
if (joystickStatus === Directions.Right) {
  // Move player to right
}

/** Objects */

const userData: { name: string; age: number } = {
  name: "test",
  age: 22
};

const complex: { data: number[]; output: (all: boolean) => number[] } = {
  data: [1, 2, 3],
  output: function(all: boolean): number[] {
    return this.data;
  }
};

/** Type aliases */

// output? means optional parameter can be pass or not
type Complex = { data: number[]; output?: (all: boolean) => number[] };

const complex2: Complex = {
  data: [1, 2, 3]
};

/** Union types */
let test: number | string | boolean = 23;

/** Check types */
let final = "String";

if (typeof final === "string") {
  console.log("Log only if is string");
}

/** never */
const neverReturns = (): never => {
  throw new Error("An error");
};

/** Exercise */
type BankAccount = { money: number; deposit: (val: number) => void };

const bankAccount: BankAccount = {
  money: 2000,
  deposit: function(value: number): void {
    this.money += value;
  }
};

const mySelf: { name: string; bankAccount: BankAccount; hobbies: string[] } = {
  name: "Test",
  bankAccount: bankAccount,
  hobbies: ["Sport", "Cooking"]
};
