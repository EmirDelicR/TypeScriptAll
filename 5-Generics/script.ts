/** Generics */

/*
What to make this function without any
const echo = (data: any): any => {
  return data;
};
*/

const echo = <T>(data: T): T => {
  return data;
};

console.log(echo("Test"));
console.log(echo<number>(27));
console.log(echo({ name: "Test", age: 27 }));

/** Build-in generic */

// Array is generic type by default
const testResults: number[] = [1.94, 2.33];

const printAll = <T>(args: T[]): void => {
  args.forEach(elem => console.log(elem));
};

printAll<string>(["Test 1", "Test 2"]);

/** Generic Types */

/**
 * This is type <T>(data: T) => T
 *  <T> -> Generic Type
 *  (data: T) => T -> Function type
 *  (data: T) -> Argument of generic type
 *  => T -> Function will return generic Type
 *  */

const echoTwo: <T>(data: T) => T = echo;

console.log(echoTwo<string>("Testing"));

/** Generic Classes */

class SimpleMath<T extends number | string> {
  baseValue: T;
  multiplyValue: T;
  calculate(): number {
    return +this.baseValue * +this.multiplyValue;
  }
}

const simpleMath = new SimpleMath<string>();
simpleMath.baseValue = "10";
simpleMath.multiplyValue = "15";
console.log(simpleMath.calculate());

/** Using multiple Generic Types in Classes */

/**
 * T extends U means that if we chose that U is number T must also be an number
 */
// class SimpleMathX<T extends U, U extends number | string> {
class SimpleMathX<T extends number, U extends number | string> {
  baseValue: T;
  multiplyValue: U;
  calculate(): number {
    return +this.baseValue * +this.multiplyValue;
  }
}

const simpleMathX = new SimpleMathX<number, string>();
simpleMathX.baseValue = 10;
simpleMathX.multiplyValue = "15";
console.log(simpleMath.calculate());

/** Exercise */

class MyMap<T> {
  // key si set up as optional name
  private map: { [key: string]: T } = {};

  setItem(key: string, item: T) {
    this.map[key] = item;
  }

  getItem(key: string): T {
    return this.map[key];
  }

  clear() {
    this.map = {};
  }

  printMap() {
    console.log(this.map);
  }
}

const numberMap = new MyMap<number>();
numberMap.setItem("apples", 5);
numberMap.setItem("bananas", 10);
numberMap.printMap();

const stringMap = new MyMap<string>();
stringMap.setItem("name", "Max");
stringMap.setItem("age", "27");
stringMap.printMap();
