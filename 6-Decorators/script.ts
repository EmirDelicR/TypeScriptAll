/************** Decorators *******************/

/**
 * Decorator is simple function that can be attached to something
 *
 */
const logged = (constructorFn: Function): void => {
  console.log(constructorFn);
};

/**************** Decorator attached to class *****************/
@logged
class Person {
  constructor() {
    console.log('HI');
  }
}

/*************** Factory *********************/
const logging = (value: boolean): any => {
  return value ? logged : null;
};

@logging(false)
class Car {}

/** Advance */
const printable = (constructorFn: Function) => {
  constructorFn.prototype.print = function() {
    console.log(this);
  };
};

/**************** Using multiple decorators **************/

// execution is bottom first
@logging(true)
@printable
class Plant {
  name: string = 'Green Plant';
}

const plant = new Plant();
(<any>plant).print();

/************* Method Decorator ***************/

const log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log('Accessor(set, get)/Method decorator!');
  console.log(target, name, descriptor);
};

const editable = (value: boolean): Function => {
  return (target: any, propName: string, descriptor: PropertyDescriptor) => {
    descriptor.writable = value;
  };
};

/********* Property decorator ***********/

const log = (target: any, propertyName: string | Symbol) => {
  console.log('Property decorator!');
  console.log(target, propertyName);
};

const overwrite = (value: boolean): Function => {
  return (target: any, propName: string): PropertyDescriptor => {
    const newDescriptor: PropertyDescriptor = {
      writable: value
    };
    return newDescriptor;
  };
};

// class with example
class Project {
  @overwrite(true)
  @log
  name: string = 'Test';

  constructor(name: string) {
    this.name = name;
  }

  @log2
  set title(val: string) {
    this.title = val;
  }

  @log2
  @editable(true)
  calcBudget() {
    console.log(1000);
  }
}

const project = new Project('Super project');
project.calcBudget();
project.calcBudget = () => console.log(2000);
project.calcBudget();

console.log(project);

/************ Parameter decorator **************/
const printInfo = (target: any, methodName: string, position: number) => {
  console.log('Target: ', target);
  console.log('Method: ', methodName);
  console.log('Index: ', position);
};

class Course {
  name: string = '';

  constructor(name: string) {
    this.name = name;
  }

  print(mode: string, @printInfo printAll: boolean) {
    let num = 1000;
    if (printAll) {
      num = 1500;
    }
    console.log(num);
  }
}

const course = new Course('Test Curse');
course.print('mode', true);

/************* Auto Bind Decorator  ****************/

// use _  is have property that is not in use like here target and methodName
const AutoBind = (
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };

  return adjustedDescriptor;
};

class Printer {
  message = 'I am alive!';

  @AutoBind
  showMsg() {
    console.log(this.message);
  }
}

const p = new Printer();
// access button from html
/**
 * const button = document.querySelector('button')!;
 *
 * one way
 * button.addEventListener('click', p.showMsg.bind(p))
 *
 * other way with decorator AutoBind
 * button.addEventListener('click', p.showMsg)
 *
 */

/************** Validation Decorator  ******************/

interface ValidatorConfig {
  [property: string]: {
    [validateProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, name: string) => {
  registeredValidators[target.constructor.name] = {
    // TODO copy exiting one and then add this one
    ...registeredValidators[target.constructor.name],
    [name]: [...registeredValidators[target.constructor.name][name], 'required']
  };
};

const PositiveNumber = (target: any, name: string) => {
  registeredValidators[target.constructor.name] = {
    // TODO copy exiting one and then add this one
    ...registeredValidators[target.constructor.name],
    [name]: [...registeredValidators[target.constructor.name][name], 'positive']
  };
};

const validate = (obj: any) => {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
};

class CourseClass {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

/**
 *  Add form on html
 */

const form = document.querySelector('form')!;
form.addEventListener('submit', event => {
  event.preventDefault();

  const titleEl = document.getElementById('title')! as HTMLInputElement;
  const priceEl = document.getElementById('price')! as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new CourseClass(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
});
