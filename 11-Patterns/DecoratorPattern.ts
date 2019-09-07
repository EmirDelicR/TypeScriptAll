abstract class Car {
  public description: string;

  public getDescription(): string {
    return this.description;
  }

  public abstract cost(): number;
}

class ModelS extends Car {
  public description: string = "Model S";

  public cost(): number {
    return 70000;
  }
}

class ModelX extends Car {
  public description: string = "Model X";

  public cost(): number {
    return 77000;
  }
}

abstract class CarOptions extends Car {
  decoratedCar: Car;
  public abstract getDescription(): string;
  public abstract cost(): number;
}

class EnhancedAutoPilot extends CarOptions {
  public decoratedCar: Car;

  constructor(car: Car) {
    super();
    this.decoratedCar = car;
  }

  public getDescription(): string {
    return this.decoratedCar.getDescription() + ", Enchanted AutoPilot";
  }

  public cost(): number {
    return this.decoratedCar.cost() + 5000;
  }
}

class RearFacingSeats extends CarOptions {
  public decoratedCar: Car;

  constructor(car: Car) {
    super();
    this.decoratedCar = car;
  }

  public getDescription(): string {
    return this.decoratedCar.getDescription() + ", Rear facing seats";
  }

  public cost(): number {
    return this.decoratedCar.cost() + 4000;
  }
}

let myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhancedAutoPilot(myTesla);
console.log(myTesla.cost());
console.log(myTesla.getDescription());
