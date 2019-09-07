class BluRayPlayer {
  turnOn() {
    console.log("BluRay player turning on...");
  }
  turnOff() {
    console.log("BluRay player turning off...");
  }
  play() {
    console.log("BluRay player playing...");
  }
}

class Amplifier {
  turnOn() {
    console.log("Amplifier turning on...");
  }
  turnOff() {
    console.log("Amplifier turning off...");
  }
  setSource(source: string) {
    console.log("Setting source to " + source);
  }
  setVolume(volumeLevel: number) {
    console.log("Setting volume to " + volumeLevel);
  }
}

class Lights {
  turnOn() {
    console.log("Lights on...");
  }
  turnOff() {
    console.log("Lights off...");
  }
  dim() {
    console.log("Lights are dimming ...");
  }
}

class TV {
  turnOn() {
    console.log("TV on...");
  }
  turnOff() {
    console.log("TV off...");
  }
}

class HomeTheaterFacade {
  private bluRay: BluRayPlayer;
  private amp: Amplifier;
  private lights: Lights;
  private tv: TV;

  constructor(amp: Amplifier, bluRay: BluRayPlayer, lights: Lights, tv: TV) {
    this.amp = amp;
    this.bluRay = bluRay;
    this.lights = lights;
    this.tv = tv;
  }

  public watchMovie() {
    this.tv.turnOn();
    this.lights.dim();
    this.bluRay.turnOn();
    this.amp.turnOn();
    this.amp.setSource("BluRay");
    this.amp.setVolume(25);
    this.bluRay.play();
  }

  public endMovie() {
    this.amp.turnOff();
    this.lights.turnOn();
    this.bluRay.turnOff();
    this.tv.turnOff();
  }
}

let bluRay = new BluRayPlayer();
let amp = new Amplifier();
let lights = new Lights();
let tv = new TV();

let homeTheater = new HomeTheaterFacade(amp, bluRay, lights, tv);
homeTheater.watchMovie();
