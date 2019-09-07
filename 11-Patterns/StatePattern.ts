interface State {
  order: Order;
  cancelOrder(): void;
  verifyPayment(): void;
  shipOrder(): void;
}

class Order {
  public cancelledOrderState: State;
  public paymentPendingState: State;
  public orderShippedState: State;
  public orderBeingPreparedState: State;

  public currentState: State;

  constructor() {
    this.cancelledOrderState = new CancelOrderState(this);
    this.paymentPendingState = new PaymentPendingState(this);
    this.orderBeingPreparedState = new OrderBeingPreparedState(this);
    this.orderShippedState = new OrderShippedState(this);

    this.setState(this.paymentPendingState);
  }

  public setState(state: State): void {
    this.currentState = state;
  }

  public getState(): State {
    return this.currentState;
  }
}

class PaymentPendingState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log("Cancelling your unpaid order...");
    this.order.setState(this.order.cancelledOrderState);
  }

  public verifyPayment() {
    console.log("payment verified! Shipping soon.");
    this.order.setState(this.order.orderBeingPreparedState);
  }

  public shipOrder() {
    console.log("Cannot ship the order when payment is pending!");
  }
}

class CancelOrderState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log("Already cancelled!");
  }

  public verifyPayment() {
    console.log("Order canceled, cannot verify!");
  }

  public shipOrder() {
    console.log("Cannot ship, is cancelled.");
  }
}

class OrderBeingPreparedState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log("Cancelling yours order...");
    this.order.setState(this.order.cancelledOrderState);
  }

  public verifyPayment() {
    console.log("Already done!");
  }

  public shipOrder() {
    console.log("Shipping yours order now");
    this.order.setState(this.order.orderShippedState);
  }
}

class OrderShippedState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log("You cannot cancelled...");
  }

  public verifyPayment() {
    console.log("You cannot verify...");
  }

  public shipOrder() {
    console.log("You cannot ship it again...");
  }
}

let order = new Order();
order.getState().shipOrder();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();
console.log("Order state: " + (<any>order.getState()).constructor.name);
