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
  data: { class: string; row: number; value: string }[];
  previousRowNum: number;
  buttons: [];
  status: boolean;
  display: HTMLElement | undefined;
  wrapper: HTMLElement | undefined;
}

class Calculator implements CalculatorInterface {
  data: { class: string; row: number; value: string }[] = setupData;
  previousRowNum: number = 0;
  buttons: [] = [];
  status: boolean = false;
  display: HTMLElement | undefined;
  wrapper: HTMLElement | undefined;

  constructor() {
    const displayElement = document.getElementById("#display");
    const wrapperElement = document.getElementById("#calcBody");
    if (displayElement) {
      this.display = displayElement;
    }
    if (wrapperElement) {
      this.wrapper = wrapperElement;
    }
  }
}
