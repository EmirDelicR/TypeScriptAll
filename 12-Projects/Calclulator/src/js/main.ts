const setupData = [
  { class: "on-off", row: 1, value: "C" },
  { class: "mc", row: 1, value: "mc" },
  { class: "num7", row: 2, value: "7" },
  { class: "num8", row: 2, value: "8" },
  { class: "num9", row: 2, value: "9" },
  { class: "divide", row: 2, value: "/" },
  { class: "num4", row: 3, value: "4" },
  { class: "num5", row: 3, value: "5" },
  { class: "num6", row: 3, value: "6" },
  { class: "multi", row: 3, value: "*" },
  { class: "num1", row: 4, value: "1" },
  { class: "num2", row: 4, value: "2" },
  { class: "num3", row: 4, value: "3" },
  { class: "minus", row: 4, value: "-" },
  { class: "num0", row: 5, value: "0" },
  { class: "dot", row: 5, value: "." },
  { class: "eql", row: 5, value: "=" },
  { class: "plus", row: 5, value: "+" }
];

interface CalculatorInterface {
  data: RowElement[];
  previousRowNum: number;
  buttonsInnerValue: string[];
  status: boolean;
  display: HTMLElement | undefined;
  wrapper: HTMLElement | undefined;
}

interface RowElement {
  class: string;
  row: number;
  value: string;
}

class Calculator implements CalculatorInterface {
  data: RowElement[] = setupData;
  previousRowNum: number = 0;
  buttonsInnerValue: string[] = [];
  status: boolean = false;
  display: HTMLElement;
  wrapper: HTMLElement;

  constructor() {
    const displayElement = document.getElementById("display");
    const wrapperElement = document.getElementById("calcBody");
    if (displayElement) {
      this.display = displayElement;
    }
    if (wrapperElement) {
      this.wrapper = wrapperElement;
    }
  }

  private buildButton(element: RowElement) {
    let button = document.createElement("button");
    button.setAttribute("class", `btn ${element.class}`);
    button.innerHTML = element.value;
    return button;
  }

  private draw() {
    let row = document.createElement("row");
    row.setAttribute("class", `row-${this.previousRowNum}`);
    let rowCheck = false;

    this.data.forEach(element => {
      rowCheck = this.checkRowNumber(element.row, this.previousRowNum);
      if (rowCheck) {
        row = document.createElement("div");
        row.setAttribute("class", `row-${element.row}`);
        this.wrapper.append(row);
      }
      let btn = this.buildButton(element);
      row.append(btn);
    });
  }

  private checkRowNumber(currentRowNum: number, previousRowNum: number) {
    if (currentRowNum !== previousRowNum) {
      this.previousRowNum = currentRowNum;
      return true;
    }
    return false;
  }

  public populateArray(button: HTMLElement) {
    let val = button.innerText;
    switch (val) {
      case "=":
        this.calculateResult();
        break;
      case "C":
        this.turnOnOff();
        break;
      case "mc":
        this.clear();
        break;
      default:
        if (this.buttonsInnerValue.length < 10 && this.status) {
          this.buttonsInnerValue.push(val);
          this.displayValues();
        }
    }
  }

  private displayValues() {
    this.display.innerHTML = "";
    let content = "";
    this.buttonsInnerValue.forEach(elem => {
      content = `${content}${elem} `;
    });
    this.display.innerHTML = content;
  }

  private displayResult(val: number) {
    this.clear();
    this.display.innerHTML = `${val}`;
  }

  private turnOnOff() {
    this.status = !this.status;
    const displayClassList = this.display.classList;

    if (displayClassList.contains("off")) {
      displayClassList.remove("off");
      displayClassList.add("on");
    } else {
      displayClassList.remove("on");
      displayClassList.add("off");
    }

    this.clear();
  }

  private clear() {
    this.display.classList.remove("error");
    this.display.innerHTML = "";
    this.buttonsInnerValue = [];
  }

  private validateInput() {
    let previousNum = this.buttonsInnerValue[0];
    if (previousNum.match(/^\d+$/)) {
      for (let i = 1; i < this.buttonsInnerValue.length; i++) {
        if (
          previousNum.match(/[-\/*+.|[\]]/g) &&
          this.buttonsInnerValue[i].match(/[-\/*+.|[\]]/g)
        ) {
          return false;
        }
        previousNum = this.buttonsInnerValue[i];
      }
      return true;
    }
    return false;
  }

  private calculateResult() {
    let check = this.validateInput();

    if (check) {
      let result = eval(this.buttonsInnerValue.join(""));
      this.displayResult(result);
      this.display.classList.remove("error");
      return;
    }
    this.display.classList.add("error");
  }

  public build() {
    this.draw();
  }
}

const initDomState = () => {
  let calc = new Calculator();
  calc.build();
  let buttons = document.getElementsByClassName("btn");

  for (let button of buttons) {
    button.addEventListener("click", event => {
      calc.populateArray(button as HTMLElement);
    });
  }
};

const domReady = (callBack: () => void) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callBack);
  }
  if (document.readyState === "interactive") {
    callBack();
  }
};

const windowReady = (callBack: () => void) => {
  if (document.readyState === "complete") {
    callBack();
    return;
  }
  window.addEventListener("load", callBack);
};

domReady(initDomState);
// windowReady(initDomState);
