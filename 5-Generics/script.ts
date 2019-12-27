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

console.log(echo('Test'));
console.log(echo<number>(27));
console.log(echo({ name: 'Test', age: 27 }));

/***************** Build-in generic ****************/

// Array is generic type by default
// const testResults: Array<number> = []  is the same
const testResults: number[] = [1.94, 2.33];

const printAll = <T>(args: T[]): void => {
  args.forEach(elem => console.log(elem));
};

printAll<string>(['Test 1', 'Test 2']);

/************** Generic Types *********************/

const echoTwo: <T>(data: T) => T = echo;
/**
 *
 *  This is type:
 *    <T>(data: T) => T
 *     -    -   -     -
 *     |    |   |     |
 *     |    |   |     |
 *     |    |   |     +------- Function will return generic Type
 *     |    |   +--------- : T Function argument generic type
 *     |    +----------- (data: T) Argument of generic type
 *     +------------- <T> Generic Type
 *
 * */

console.log(echoTwo<string>('Testing'));

// Promise<string> means that promise will return string so you can use build in functions on string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

/************** Generic Function *********************/

// T extends object - means that can only can receive object
const merge = <T extends object, U extends object>(obj1: T, obj2: U) => {
  return Object.assign(obj1, obj2);
};

const merged = merge({ name: 'Test', hobbies: ['Sport'] }, { count: 230 });
console.log(merged.count);

// Adding new interface to function
interface Length {
  length: number;
}
const countAndDescribe = <T extends Length>(elem: T): [T, string] => {
  let description =
    elem.length > 0 ? `Got ${elem.length} elements.` : 'No elements.';

  return [elem, description];
};

// keyof usage
const extract = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return obj[key];
};

extract({ name: 'Test' }, name);

/***************** Generic Classes *****************/

// storage class

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('10');
///////////////////////////////////////////

class SimpleMath<T extends number | string> {
  baseValue: T;
  multiplyValue: T;
  calculate(): number {
    return +this.baseValue * +this.multiplyValue;
  }
}

const simpleMath = new SimpleMath<string>();
simpleMath.baseValue = '10';
simpleMath.multiplyValue = '15';
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
simpleMathX.multiplyValue = '15';
console.log(simpleMath.calculate());

/**************** Exercise *********************/

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
numberMap.setItem('apples', 5);
numberMap.setItem('bananas', 10);
numberMap.printMap();

const stringMap = new MyMap<string>();
stringMap.setItem('name', 'Max');
stringMap.setItem('age', '27');
stringMap.printMap();
