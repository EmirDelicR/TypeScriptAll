/** Decorators */

/**
 * Decorator is simple function that can be attached to something
 *
 */
const logged = (constructorFn: Function): void => {
  console.log(constructorFn);
};

/** Decorator attached to class */
@logged
class Person {
  constructor() {
    console.log("HI");
  }
}

/** Factory */
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

/** Using multiple decorators */
@logging(true)
@printable
class Plant {
  name: string = "Green Plant";
}

const plant = new Plant();
(<any>plant).print();

/** Method Decorator */

const editable = (value: boolean): Function => {
  return (target: any, propName: string, descriptor: PropertyDescriptor) => {
    descriptor.writable = value;
  };
};

/** Property decorator */

const overwrite = (value: boolean): Function => {
  return (target: any, propName: string): PropertyDescriptor => {
    const newDescriptor: PropertyDescriptor = {
      writable: value
    };
    return newDescriptor;
  };
};

class Project {
  @overwrite(true)
  name: string = "Test";

  constructor(name: string) {
    this.name = name;
  }

  @editable(true)
  calcBudget() {
    console.log(1000);
  }
}

const project = new Project("Super project");
project.calcBudget();
project.calcBudget = () => console.log(2000);
project.calcBudget();

console.log(project);

/** Parameter decorator */
const printInfo = (target: any, methodName: string, parentIndex: number) => {
  console.log("Target: ", target);
  console.log("Method: ", methodName);
  console.log("Index: ", parentIndex);
};

class Course {
  name: string = "";

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

const course = new Course("Test Curse");
course.print("mode", true);
