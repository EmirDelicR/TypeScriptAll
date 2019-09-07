interface IPhoneSocket {
  usePort(): void;
}
interface AndroidSocket {
  useMicroUSB(): void;
}

class IPhone7 implements IPhoneSocket {
  usePort() {
    console.log("Using iPhone7 port....");
  }
}

class Android implements AndroidSocket {
  useMicroUSB() {
    console.log("Using micro USB....");
  }
}

class Adapter implements AndroidSocket {
  iPhoneDevice: IPhoneSocket;

  constructor(iPhone: IPhoneSocket) {
    this.iPhoneDevice = iPhone;
  }

  public useMicroUSB(): void {
    console.log("Using micro USB,converting to iPhone7 port");
    this.iPhoneDevice.usePort();
  }
}

let iPhone = new IPhone7();
let chargeAdapter = new Adapter(iPhone);

chargeAdapter.useMicroUSB();
