/**#######################  Advance Types  ######################*/

/*************  Intersection Types *************/

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// can be used the same for interfaces
type SuperEmployee = Admin & Employee;

const emp: SuperEmployee = {
  name: 'Emp name',
  privileges: ['create-server', 'restart-server'],
  startDate: new Date()
};

/*************  Type Guards *************/

type UnknownEmployee = Admin | Employee;

const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.log('Name: ', emp.name);
  // check types in object in TS
  if ('startDate' in emp) {
    console.log('Start Date: ', emp.startDate);
  }
};

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving truck...');
  }
  loadCargo() {
    console.log('Loading...');
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (v: Vehicle) => {
  v.drive();

  if (v instanceof Truck) {
    v.loadCargo();
  }
};

/*************  Discriminated Unions *************/

// can be done with types or classes using interface as example
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (a: Animal) => {
  let speed;
  switch (a.type) {
    case 'bird':
      speed = a.flyingSpeed;
      break;
    case 'horse':
      speed = a.runningSpeed;
      break;
    default:
      speed = 0;
  }
  console.log('Moving with speed: ', speed);
};

/***************  Type Casting ***************/

// ! at end means that will never be null
// one way of casting type
const input = <HTMLInputElement>document.getElementById('test')!;
input.value = 'Test';
// other way
const input1 = document.getElementById('test')! as HTMLInputElement;
input1.value = 'Test';

/***************  Index Properties ***************/

interface ErrorContainer {
  /**
   * this can be used to create { email: 'Error msg', username: 'Error msg'}
   * In this case we only say that object need to have property and message as string
   * we don't know how many
   */
  id: string;
  [prop: string]: string;
}

const error: ErrorContainer = {
  id: '1',
  email: 'Not valid Email',
  username: 'Must be 8 digit long...'
};

/***************  Function overloads ***************/

function add(a: string, b: string): string; // remove this and split can not be used
function add(a: string | number, b: string | number) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const res = add('a', 'b');
res.split(' ');

/*************** Optional chaining ***************/

// fetchedUserData?.job?.title -> check if fetchedUserData, then job exists
const fetchedUserData = {
  id: 'u1',
  name: 'Test',
  job: { title: 'Some job', description: 'Some description' }
};

console.log(fetchedUserData?.job?.title);

/*************** Null-ish Coalescing ***************/

const fetchUser = null;
// check if only null or undefined not other null-ish values like ''
const storedData = fetchUser ?? 'Some Default';
