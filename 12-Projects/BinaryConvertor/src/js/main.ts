interface ConvertorInterface {
  num1: number;
  num2: number;
  min: number;
  max: number;
  converted1: string;
  converted2: string;
  result: string;
  sumProElem: string;

  displayGeneratedNumber(element: any): void;
  setVal(num1: number, num2?: number): void;
  validateInput(num1: number, num2: number): boolean;

  convert(
    conversionType: string,
    num1: number,
    num2: number,
    sumProElem?: number
  ): void;

  displayConvertedValue(elem: any, conversionType: string): void;
  createElement(conversionType: string, convertedValue: any): any;
  chooseFunction(functionType: string, conversionType: string): void;

  displayIncDecResult(
    elem: any,
    conversionType: string,
    functionType: string
  ): void;

  increment(conversionType: string): void;
  decrement(conversionType: string): void;
  compare(conversionType: string): string;
  add(conversionType: string): string;
  multi(conversionType: string): string;

  displayFunctionResult(
    elem: any,
    conversionType: string,
    functionType: string
  ): void;
}

class Convertor implements ConvertorInterface {
  num1: number;
  num2: number;
  min: number;
  max: number;
  converted1: string;
  converted2: string;
  result: string;
  sumProElem: string;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.converted1 = "";
    this.converted2 = "";
  }

  private generateNumber(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

  displayGeneratedNumber(element: HTMLElement): void {
    const num: number = this.generateNumber();
    element.setAttribute("value", `${num}`);
  }

  private getVal(): number[] {
    let list: number[] = [this.num1, this.num2];
    return list;
  }

  setVal(num1: number, num2: number): void {
    if (num1 < 0) num1 *= -1;
    if (num2 < 0) num2 *= -1;

    this.num1 = num1;
    this.num2 = num2;
  }

  validateInput(num1: number, num2: number): boolean {
    let validationPlaceholders = document.getElementsByClassName("in-er");
    let isError = false;
    if (isNaN(num1) && isNaN(num2)) {
      isError = true;
    }

    for (let element of validationPlaceholders) {
      if (isError) {
        element.classList.add("error");
      }
      element.classList.remove("error");
    }

    if (isError) {
      return false;
    }
    return true;
  }

  convert(
    conversionType: string,
    num1: number,
    num2: number,
    sumProElem?: number
  ): void {
    this.result = "Need input";
    let selectErrorPlaceholder = document.getElementsByClassName("sel-er")[0];
    selectErrorPlaceholder.classList.remove("error");

    switch (conversionType) {
      case "Binary":
        this.converted1 = num1.toString(2);
        this.converted2 = num2.toString(2);
        if (sumProElem) this.sumProElem = sumProElem.toString(2);
        break;
      case "Octave":
        this.converted1 = num1.toString(8);
        this.converted2 = num2.toString(8);
        if (sumProElem) this.sumProElem = sumProElem.toString(8);
        break;
      case "Hexadecimal":
        this.converted1 = num1.toString(16);
        this.converted2 = num2.toString(16);
        if (sumProElem) this.sumProElem = sumProElem.toString(16);
        break;
      default:
        selectErrorPlaceholder.classList.add("error");
    }
  }

  displayConvertedValue(element: HTMLElement, conversionType: string): void {
    element.innerHTML = "";
    if (conversionType === "0") {
      return;
    }

    let valOne = this.createElement(conversionType, this.converted1);
    let valTwo = this.createElement(conversionType, this.converted2);
    let br = document.createElement("br");

    element.append(valOne);
    element.append(br);
    element.append(valTwo);
  }
  /* ---------------------------------------------------------------------------------- */
  createElement(conversionType: string, convertedValue: string) {
    convertedValue === ""
      ? (convertedValue = this.result)
      : (convertedValue = convertedValue);

    let container = document.createElement("div");
    container.classList.add("input-group");

    let type = document.createElement("span");
    type.classList.add("input-group-addon");
    type.id = "basic-addon";
    type.innerHTML = conversionType;

    let value = document.createElement("input");
    value.classList.add("form-control");
    value.classList.add("readonly");
    value.setAttribute("aria-describedby", "basic-addon");
    value.setAttribute("value", convertedValue);

    container.append(type);
    container.append(value);

    return container;
  }

  chooseFunction(functionType: string, conversionType: string): void {
    let selectFuncError = document.getElementsByClassName("sel-fun-er")[0];
    selectFuncError.classList.remove("error");

    switch (functionType) {
      case "Increment":
        this.increment(conversionType);
        break;
      case "Decrement":
        this.decrement(conversionType);
        break;
      case "Compare":
        this.result = this.compare(conversionType);
        break;
      case "Add":
        this.result = this.add(conversionType);
        break;
      case "Multi":
        this.result = this.multi(conversionType);
        break;
      default:
        selectFuncError.classList.add("error");
    }
  }

  displayIncDecResult(
    element: HTMLElement,
    conversionType: string,
    functionType: string
  ): void {
    element.innerHTML = "";

    if (conversionType === "0" && functionType === "0") {
      return;
    }

    let incOne = this.createElement(functionType, this.converted1);
    let incTwo = this.createElement(functionType, this.converted2);
    let br = document.createElement("br");

    element.append(incOne);
    element.append(br);
    element.append(incTwo);
  }

  increment(conversionType: string): void {
    let num1 = this.num1 + 1;
    let num2 = this.num2 + 1;
    this.convert(conversionType, num1, num2);
  }

  decrement(conversionType: string): void {
    let num1 = this.num1 - 1;
    let num2 = this.num2 - 1;
    this.convert(conversionType, num1, num2);
  }

  compare(conversionType: string): string {
    let num1 = this.num1;
    let num2 = this.num2;
    let result = "equal";
    let compare = "then";
    if (!num1 && !num2) {
      return "Error: Input both numbers";
    }

    if (num1 > num2) result = "bigger";
    if (num1 < num2) result = "smaller";

    if (result === "equal") {
      compare = "to";
    }

    return `${conversionType}: The number ${this.converted1} is ${result} ${compare} ${this.converted2}`;
  }

  displayFunctionResult(
    element: HTMLElement,
    conversionType: string,
    functionType: string
  ): void {
    element.innerHTML = "";
    if (conversionType === "0" && functionType === "0") {
      return;
    }
    let funcResult = this.createElement(functionType, this.result);
    element.append(funcResult);
  }

  add(conversionType: string): string {
    let num1 = this.num1;
    let num2 = this.num2;
    let sum = num1 + num2;
    this.convert(conversionType, num1, num2, sum);

    return `${conversionType}: The sum of number ${this.converted1} and ${this.converted2} is ${this.sumProElem}`;
  }

  multi(conversionType: string): string {
    let num1 = this.num1;
    let num2 = this.num2;
    let sum = num1 * num2;
    this.convert(conversionType, num1, num2, sum);

    return `${conversionType}: The product of number ${this.converted1} and ${this.converted2} is ${this.sumProElem}`;
  }
  /* End */
}

const initDomState = () => {
  const test = new Convertor(1, 1000);
  /* cache doom */
  let $convertBtn = document.getElementsByClassName("convert")[0];
  let $convertFuncBtn = document.getElementsByClassName("convertFunc")[0];
  let $inputOne = document.getElementById("inOne");
  let $inputTwo = document.getElementById("inTwo");
  let $selectType = document.getElementsByClassName("conversionType")[0];
  let $selectFunc = document.getElementsByClassName("conversionFunc")[0];
  let $displayConversion = document.getElementsByClassName(
    "see-conversions"
  )[0];
  let $displayFuncResult = document.getElementsByClassName(
    "see-conversions-result"
  )[0];

  /** Set event listeners */
  let buttons = document.getElementsByClassName("generate");

  for (let button of buttons) {
    button.addEventListener("click", event => {
      let element = button.parentElement;

      if (element) {
        const input = element.nextElementSibling;
        test.displayGeneratedNumber(input as HTMLElement);
      }
    });
  }

  $convertBtn.addEventListener("click", () => {
    let num1 = parseInt((<HTMLInputElement>$inputOne).value);
    let num2 = parseInt((<HTMLInputElement>$inputTwo).value);
    let check = test.validateInput(num1, num2);
    let typeSel = (<HTMLInputElement>$selectType).value;

    if (!check) {
      return;
    }

    test.setVal(num1, num2);
    test.convert(typeSel, num1, num2);
    test.displayConvertedValue($displayConversion as HTMLElement, typeSel);
  });

  $convertFuncBtn.addEventListener("click", () => {
    let num1 = parseInt((<HTMLInputElement>$inputOne).value);
    let num2 = parseInt((<HTMLInputElement>$inputTwo).value);
    let check = test.validateInput(num1, num2);
    let typeSel = (<HTMLInputElement>$selectType).value;
    let typeOfFunc = (<HTMLInputElement>$selectFunc).value;

    if (!check) {
      return;
    }

    test.setVal(num1, num2);
    test.convert(typeSel, num1, num2);
    test.chooseFunction(typeOfFunc, typeSel);

    if (typeOfFunc === "Increment" || typeOfFunc === "Decrement") {
      test.displayIncDecResult(
        $displayFuncResult as HTMLElement,
        typeSel,
        typeOfFunc
      );
      return;
    }
    test.displayFunctionResult(
      $displayFuncResult as HTMLElement,
      typeSel,
      typeOfFunc
    );
  });
};

const domReady = (callBack: () => void) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callBack);
  }
  if (document.readyState === "interactive") {
    callBack();
  }
};

domReady(initDomState);
