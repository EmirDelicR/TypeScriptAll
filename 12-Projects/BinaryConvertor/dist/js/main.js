"use strict";
class Convertor {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.converted1 = "";
        this.converted2 = "";
    }
    generateNumber() {
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
    displayGeneratedNumber(element) {
        const num = this.generateNumber();
        element.setAttribute("value", `${num}`);
    }
    getVal() {
        let list = [this.num1, this.num2];
        return list;
    }
    setVal(num1, num2) {
        if (num1 < 0)
            num1 *= -1;
        if (num2 < 0)
            num2 *= -1;
        this.num1 = num1;
        this.num2 = num2;
    }
    validateInput(num1, num2) {
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
    convert(conversionType, num1, num2, sumProElem) {
        this.result = "Need input";
        let selectErrorPlaceholder = document.getElementsByClassName("sel-er")[0];
        selectErrorPlaceholder.classList.remove("error");
        switch (conversionType) {
            case "Binary":
                this.converted1 = num1.toString(2);
                this.converted2 = num2.toString(2);
                if (sumProElem)
                    this.sumProElem = sumProElem.toString(2);
                break;
            case "Octave":
                this.converted1 = num1.toString(8);
                this.converted2 = num2.toString(8);
                if (sumProElem)
                    this.sumProElem = sumProElem.toString(8);
                break;
            case "Hexadecimal":
                this.converted1 = num1.toString(16);
                this.converted2 = num2.toString(16);
                if (sumProElem)
                    this.sumProElem = sumProElem.toString(16);
                break;
            default:
                selectErrorPlaceholder.classList.add("error");
        }
    }
    displayConvertedValue(element, conversionType) {
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
    createElement(conversionType, convertedValue) {
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
    chooseFunction(functionType, conversionType) {
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
    displayIncDecResult(element, conversionType, functionType) {
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
    increment(conversionType) {
        let num1 = this.num1 + 1;
        let num2 = this.num2 + 1;
        this.convert(conversionType, num1, num2);
    }
    decrement(conversionType) {
        let num1 = this.num1 - 1;
        let num2 = this.num2 - 1;
        this.convert(conversionType, num1, num2);
    }
    compare(conversionType) {
        let num1 = this.num1;
        let num2 = this.num2;
        let result = "equal";
        let compare = "then";
        if (!num1 && !num2) {
            return "Error: Input both numbers";
        }
        if (num1 > num2)
            result = "bigger";
        if (num1 < num2)
            result = "smaller";
        if (result === "equal") {
            compare = "to";
        }
        return `${conversionType}: The number ${this.converted1} is ${result} ${compare} ${this.converted2}`;
    }
    displayFunctionResult(element, conversionType, functionType) {
        element.innerHTML = "";
        if (conversionType === "0" && functionType === "0") {
            return;
        }
        let funcResult = this.createElement(functionType, this.result);
        element.append(funcResult);
    }
    add(conversionType) {
        let num1 = this.num1;
        let num2 = this.num2;
        let sum = num1 + num2;
        this.convert(conversionType, num1, num2, sum);
        return `${conversionType}: The sum of number ${this.converted1} and ${this.converted2} is ${this.sumProElem}`;
    }
    multi(conversionType) {
        let num1 = this.num1;
        let num2 = this.num2;
        let sum = num1 * num2;
        this.convert(conversionType, num1, num2, sum);
        return `${conversionType}: The product of number ${this.converted1} and ${this.converted2} is ${this.sumProElem}`;
    }
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
    let $displayConversion = document.getElementsByClassName("see-conversions")[0];
    let $displayFuncResult = document.getElementsByClassName("see-conversions-result")[0];
    /** Set event listeners */
    let buttons = document.getElementsByClassName("generate");
    for (let button of buttons) {
        button.addEventListener("click", event => {
            let element = button.parentElement;
            if (element) {
                const input = element.nextElementSibling;
                test.displayGeneratedNumber(input);
            }
        });
    }
    $convertBtn.addEventListener("click", () => {
        let num1 = parseInt($inputOne.value);
        let num2 = parseInt($inputTwo.value);
        let check = test.validateInput(num1, num2);
        let typeSel = $selectType.value;
        if (!check) {
            return;
        }
        test.setVal(num1, num2);
        test.convert(typeSel, num1, num2);
        test.displayConvertedValue($displayConversion, typeSel);
    });
    $convertFuncBtn.addEventListener("click", () => {
        let num1 = parseInt($inputOne.value);
        let num2 = parseInt($inputTwo.value);
        let check = test.validateInput(num1, num2);
        let typeSel = $selectType.value;
        let typeOfFunc = $selectFunc.value;
        if (!check) {
            return;
        }
        test.setVal(num1, num2);
        test.convert(typeSel, num1, num2);
        test.chooseFunction(typeOfFunc, typeSel);
        if (typeOfFunc === "Increment" || typeOfFunc === "Decrement") {
            test.displayIncDecResult($displayFuncResult, typeSel, typeOfFunc);
            return;
        }
        test.displayFunctionResult($displayFuncResult, typeSel, typeOfFunc);
    });
};
const domReady = (callBack) => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callBack);
    }
    if (document.readyState === "interactive") {
        callBack();
    }
};
domReady(initDomState);

//# sourceMappingURL=data:application/json;charset=utf8;base64,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USxDQUFDLFVBQVUsS0FBSyxhQUFhLEVBQUU7UUFDekMsUUFBUSxFQUFFLENBQUM7S0FDWjtBQUNILENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIENvbnZlcnRvckludGVyZmFjZSB7XG4gIG51bTE6IG51bWJlcjtcbiAgbnVtMjogbnVtYmVyO1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIGNvbnZlcnRlZDE6IHN0cmluZztcbiAgY29udmVydGVkMjogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbiAgc3VtUHJvRWxlbTogc3RyaW5nO1xuXG4gIGRpc3BsYXlHZW5lcmF0ZWROdW1iZXIoZWxlbWVudDogYW55KTogdm9pZDtcbiAgc2V0VmFsKG51bTE6IG51bWJlciwgbnVtMj86IG51bWJlcik6IHZvaWQ7XG4gIHZhbGlkYXRlSW5wdXQobnVtMTogbnVtYmVyLCBudW0yOiBudW1iZXIpOiBib29sZWFuO1xuXG4gIGNvbnZlcnQoXG4gICAgY29udmVyc2lvblR5cGU6IHN0cmluZyxcbiAgICBudW0xOiBudW1iZXIsXG4gICAgbnVtMjogbnVtYmVyLFxuICAgIHN1bVByb0VsZW0/OiBudW1iZXJcbiAgKTogdm9pZDtcblxuICBkaXNwbGF5Q29udmVydGVkVmFsdWUoZWxlbTogYW55LCBjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogdm9pZDtcbiAgY3JlYXRlRWxlbWVudChjb252ZXJzaW9uVHlwZTogc3RyaW5nLCBjb252ZXJ0ZWRWYWx1ZTogYW55KTogYW55O1xuICBjaG9vc2VGdW5jdGlvbihmdW5jdGlvblR5cGU6IHN0cmluZywgY29udmVyc2lvblR5cGU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgZGlzcGxheUluY0RlY1Jlc3VsdChcbiAgICBlbGVtOiBhbnksXG4gICAgY29udmVyc2lvblR5cGU6IHN0cmluZyxcbiAgICBmdW5jdGlvblR5cGU6IHN0cmluZ1xuICApOiB2b2lkO1xuXG4gIGluY3JlbWVudChjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogdm9pZDtcbiAgZGVjcmVtZW50KGNvbnZlcnNpb25UeXBlOiBzdHJpbmcpOiB2b2lkO1xuICBjb21wYXJlKGNvbnZlcnNpb25UeXBlOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFkZChjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogc3RyaW5nO1xuICBtdWx0aShjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogc3RyaW5nO1xuXG4gIGRpc3BsYXlGdW5jdGlvblJlc3VsdChcbiAgICBlbGVtOiBhbnksXG4gICAgY29udmVyc2lvblR5cGU6IHN0cmluZyxcbiAgICBmdW5jdGlvblR5cGU6IHN0cmluZ1xuICApOiB2b2lkO1xufVxuXG5jbGFzcyBDb252ZXJ0b3IgaW1wbGVtZW50cyBDb252ZXJ0b3JJbnRlcmZhY2Uge1xuICBudW0xOiBudW1iZXI7XG4gIG51bTI6IG51bWJlcjtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBjb252ZXJ0ZWQxOiBzdHJpbmc7XG4gIGNvbnZlcnRlZDI6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG4gIHN1bVByb0VsZW06IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLmNvbnZlcnRlZDEgPSBcIlwiO1xuICAgIHRoaXMuY29udmVydGVkMiA9IFwiXCI7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTnVtYmVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heCAtIHRoaXMubWluICsgMSkgKyB0aGlzLm1pbik7XG4gIH1cblxuICBkaXNwbGF5R2VuZXJhdGVkTnVtYmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgbnVtOiBudW1iZXIgPSB0aGlzLmdlbmVyYXRlTnVtYmVyKCk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHtudW19YCk7XG4gIH1cblxuICBwcml2YXRlIGdldFZhbCgpOiBudW1iZXJbXSB7XG4gICAgbGV0IGxpc3Q6IG51bWJlcltdID0gW3RoaXMubnVtMSwgdGhpcy5udW0yXTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIHNldFZhbChudW0xOiBudW1iZXIsIG51bTI6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChudW0xIDwgMCkgbnVtMSAqPSAtMTtcbiAgICBpZiAobnVtMiA8IDApIG51bTIgKj0gLTE7XG5cbiAgICB0aGlzLm51bTEgPSBudW0xO1xuICAgIHRoaXMubnVtMiA9IG51bTI7XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0KG51bTE6IG51bWJlciwgbnVtMjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgbGV0IHZhbGlkYXRpb25QbGFjZWhvbGRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW4tZXJcIik7XG4gICAgbGV0IGlzRXJyb3IgPSBmYWxzZTtcbiAgICBpZiAoaXNOYU4obnVtMSkgJiYgaXNOYU4obnVtMikpIHtcbiAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdmFsaWRhdGlvblBsYWNlaG9sZGVycykge1xuICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICB9XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICB9XG5cbiAgICBpZiAoaXNFcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnZlcnQoXG4gICAgY29udmVyc2lvblR5cGU6IHN0cmluZyxcbiAgICBudW0xOiBudW1iZXIsXG4gICAgbnVtMjogbnVtYmVyLFxuICAgIHN1bVByb0VsZW0/OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5yZXN1bHQgPSBcIk5lZWQgaW5wdXRcIjtcbiAgICBsZXQgc2VsZWN0RXJyb3JQbGFjZWhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWwtZXJcIilbMF07XG4gICAgc2VsZWN0RXJyb3JQbGFjZWhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG5cbiAgICBzd2l0Y2ggKGNvbnZlcnNpb25UeXBlKSB7XG4gICAgICBjYXNlIFwiQmluYXJ5XCI6XG4gICAgICAgIHRoaXMuY29udmVydGVkMSA9IG51bTEudG9TdHJpbmcoMik7XG4gICAgICAgIHRoaXMuY29udmVydGVkMiA9IG51bTIudG9TdHJpbmcoMik7XG4gICAgICAgIGlmIChzdW1Qcm9FbGVtKSB0aGlzLnN1bVByb0VsZW0gPSBzdW1Qcm9FbGVtLnRvU3RyaW5nKDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJPY3RhdmVcIjpcbiAgICAgICAgdGhpcy5jb252ZXJ0ZWQxID0gbnVtMS50b1N0cmluZyg4KTtcbiAgICAgICAgdGhpcy5jb252ZXJ0ZWQyID0gbnVtMi50b1N0cmluZyg4KTtcbiAgICAgICAgaWYgKHN1bVByb0VsZW0pIHRoaXMuc3VtUHJvRWxlbSA9IHN1bVByb0VsZW0udG9TdHJpbmcoOCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkhleGFkZWNpbWFsXCI6XG4gICAgICAgIHRoaXMuY29udmVydGVkMSA9IG51bTEudG9TdHJpbmcoMTYpO1xuICAgICAgICB0aGlzLmNvbnZlcnRlZDIgPSBudW0yLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaWYgKHN1bVByb0VsZW0pIHRoaXMuc3VtUHJvRWxlbSA9IHN1bVByb0VsZW0udG9TdHJpbmcoMTYpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNlbGVjdEVycm9yUGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlDb252ZXJ0ZWRWYWx1ZShlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udmVyc2lvblR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBpZiAoY29udmVyc2lvblR5cGUgPT09IFwiMFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHZhbE9uZSA9IHRoaXMuY3JlYXRlRWxlbWVudChjb252ZXJzaW9uVHlwZSwgdGhpcy5jb252ZXJ0ZWQxKTtcbiAgICBsZXQgdmFsVHdvID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbnZlcnNpb25UeXBlLCB0aGlzLmNvbnZlcnRlZDIpO1xuICAgIGxldCBiciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcblxuICAgIGVsZW1lbnQuYXBwZW5kKHZhbE9uZSk7XG4gICAgZWxlbWVudC5hcHBlbmQoYnIpO1xuICAgIGVsZW1lbnQuYXBwZW5kKHZhbFR3byk7XG4gIH1cbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBjcmVhdGVFbGVtZW50KGNvbnZlcnNpb25UeXBlOiBzdHJpbmcsIGNvbnZlcnRlZFZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb252ZXJ0ZWRWYWx1ZSA9PT0gXCJcIlxuICAgICAgPyAoY29udmVydGVkVmFsdWUgPSB0aGlzLnJlc3VsdClcbiAgICAgIDogKGNvbnZlcnRlZFZhbHVlID0gY29udmVydGVkVmFsdWUpO1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cFwiKTtcblxuICAgIGxldCB0eXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdHlwZS5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXAtYWRkb25cIik7XG4gICAgdHlwZS5pZCA9IFwiYmFzaWMtYWRkb25cIjtcbiAgICB0eXBlLmlubmVySFRNTCA9IGNvbnZlcnNpb25UeXBlO1xuXG4gICAgbGV0IHZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHZhbHVlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XG4gICAgdmFsdWUuY2xhc3NMaXN0LmFkZChcInJlYWRvbmx5XCIpO1xuICAgIHZhbHVlLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJiYXNpYy1hZGRvblwiKTtcbiAgICB2YWx1ZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBjb252ZXJ0ZWRWYWx1ZSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kKHR5cGUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmQodmFsdWUpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfVxuXG4gIGNob29zZUZ1bmN0aW9uKGZ1bmN0aW9uVHlwZTogc3RyaW5nLCBjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHNlbGVjdEZ1bmNFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWwtZnVuLWVyXCIpWzBdO1xuICAgIHNlbGVjdEZ1bmNFcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG5cbiAgICBzd2l0Y2ggKGZ1bmN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBcIkluY3JlbWVudFwiOlxuICAgICAgICB0aGlzLmluY3JlbWVudChjb252ZXJzaW9uVHlwZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkRlY3JlbWVudFwiOlxuICAgICAgICB0aGlzLmRlY3JlbWVudChjb252ZXJzaW9uVHlwZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkNvbXBhcmVcIjpcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmNvbXBhcmUoY29udmVyc2lvblR5cGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBZGRcIjpcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmFkZChjb252ZXJzaW9uVHlwZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpXCI6XG4gICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5tdWx0aShjb252ZXJzaW9uVHlwZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2VsZWN0RnVuY0Vycm9yLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5SW5jRGVjUmVzdWx0KFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGNvbnZlcnNpb25UeXBlOiBzdHJpbmcsXG4gICAgZnVuY3Rpb25UeXBlOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgaWYgKGNvbnZlcnNpb25UeXBlID09PSBcIjBcIiAmJiBmdW5jdGlvblR5cGUgPT09IFwiMFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGluY09uZSA9IHRoaXMuY3JlYXRlRWxlbWVudChmdW5jdGlvblR5cGUsIHRoaXMuY29udmVydGVkMSk7XG4gICAgbGV0IGluY1R3byA9IHRoaXMuY3JlYXRlRWxlbWVudChmdW5jdGlvblR5cGUsIHRoaXMuY29udmVydGVkMik7XG4gICAgbGV0IGJyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpO1xuXG4gICAgZWxlbWVudC5hcHBlbmQoaW5jT25lKTtcbiAgICBlbGVtZW50LmFwcGVuZChicik7XG4gICAgZWxlbWVudC5hcHBlbmQoaW5jVHdvKTtcbiAgfVxuXG4gIGluY3JlbWVudChjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IG51bTEgPSB0aGlzLm51bTEgKyAxO1xuICAgIGxldCBudW0yID0gdGhpcy5udW0yICsgMTtcbiAgICB0aGlzLmNvbnZlcnQoY29udmVyc2lvblR5cGUsIG51bTEsIG51bTIpO1xuICB9XG5cbiAgZGVjcmVtZW50KGNvbnZlcnNpb25UeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgbnVtMSA9IHRoaXMubnVtMSAtIDE7XG4gICAgbGV0IG51bTIgPSB0aGlzLm51bTIgLSAxO1xuICAgIHRoaXMuY29udmVydChjb252ZXJzaW9uVHlwZSwgbnVtMSwgbnVtMik7XG4gIH1cblxuICBjb21wYXJlKGNvbnZlcnNpb25UeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBudW0xID0gdGhpcy5udW0xO1xuICAgIGxldCBudW0yID0gdGhpcy5udW0yO1xuICAgIGxldCByZXN1bHQgPSBcImVxdWFsXCI7XG4gICAgbGV0IGNvbXBhcmUgPSBcInRoZW5cIjtcbiAgICBpZiAoIW51bTEgJiYgIW51bTIpIHtcbiAgICAgIHJldHVybiBcIkVycm9yOiBJbnB1dCBib3RoIG51bWJlcnNcIjtcbiAgICB9XG5cbiAgICBpZiAobnVtMSA+IG51bTIpIHJlc3VsdCA9IFwiYmlnZ2VyXCI7XG4gICAgaWYgKG51bTEgPCBudW0yKSByZXN1bHQgPSBcInNtYWxsZXJcIjtcblxuICAgIGlmIChyZXN1bHQgPT09IFwiZXF1YWxcIikge1xuICAgICAgY29tcGFyZSA9IFwidG9cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7Y29udmVyc2lvblR5cGV9OiBUaGUgbnVtYmVyICR7dGhpcy5jb252ZXJ0ZWQxfSBpcyAke3Jlc3VsdH0gJHtjb21wYXJlfSAke3RoaXMuY29udmVydGVkMn1gO1xuICB9XG5cbiAgZGlzcGxheUZ1bmN0aW9uUmVzdWx0KFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGNvbnZlcnNpb25UeXBlOiBzdHJpbmcsXG4gICAgZnVuY3Rpb25UeXBlOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGlmIChjb252ZXJzaW9uVHlwZSA9PT0gXCIwXCIgJiYgZnVuY3Rpb25UeXBlID09PSBcIjBcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZnVuY1Jlc3VsdCA9IHRoaXMuY3JlYXRlRWxlbWVudChmdW5jdGlvblR5cGUsIHRoaXMucmVzdWx0KTtcbiAgICBlbGVtZW50LmFwcGVuZChmdW5jUmVzdWx0KTtcbiAgfVxuXG4gIGFkZChjb252ZXJzaW9uVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbnVtMSA9IHRoaXMubnVtMTtcbiAgICBsZXQgbnVtMiA9IHRoaXMubnVtMjtcbiAgICBsZXQgc3VtID0gbnVtMSArIG51bTI7XG4gICAgdGhpcy5jb252ZXJ0KGNvbnZlcnNpb25UeXBlLCBudW0xLCBudW0yLCBzdW0pO1xuXG4gICAgcmV0dXJuIGAke2NvbnZlcnNpb25UeXBlfTogVGhlIHN1bSBvZiBudW1iZXIgJHt0aGlzLmNvbnZlcnRlZDF9IGFuZCAke3RoaXMuY29udmVydGVkMn0gaXMgJHt0aGlzLnN1bVByb0VsZW19YDtcbiAgfVxuXG4gIG11bHRpKGNvbnZlcnNpb25UeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBudW0xID0gdGhpcy5udW0xO1xuICAgIGxldCBudW0yID0gdGhpcy5udW0yO1xuICAgIGxldCBzdW0gPSBudW0xICogbnVtMjtcbiAgICB0aGlzLmNvbnZlcnQoY29udmVyc2lvblR5cGUsIG51bTEsIG51bTIsIHN1bSk7XG5cbiAgICByZXR1cm4gYCR7Y29udmVyc2lvblR5cGV9OiBUaGUgcHJvZHVjdCBvZiBudW1iZXIgJHt0aGlzLmNvbnZlcnRlZDF9IGFuZCAke3RoaXMuY29udmVydGVkMn0gaXMgJHt0aGlzLnN1bVByb0VsZW19YDtcbiAgfVxuICAvKiBFbmQgKi9cbn1cblxuY29uc3QgaW5pdERvbVN0YXRlID0gKCkgPT4ge1xuICBjb25zdCB0ZXN0ID0gbmV3IENvbnZlcnRvcigxLCAxMDAwKTtcbiAgLyogY2FjaGUgZG9vbSAqL1xuICBsZXQgJGNvbnZlcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udmVydFwiKVswXTtcbiAgbGV0ICRjb252ZXJ0RnVuY0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb252ZXJ0RnVuY1wiKVswXTtcbiAgbGV0ICRpbnB1dE9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5PbmVcIik7XG4gIGxldCAkaW5wdXRUd28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluVHdvXCIpO1xuICBsZXQgJHNlbGVjdFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udmVyc2lvblR5cGVcIilbMF07XG4gIGxldCAkc2VsZWN0RnVuYyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb252ZXJzaW9uRnVuY1wiKVswXTtcbiAgbGV0ICRkaXNwbGF5Q29udmVyc2lvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgXCJzZWUtY29udmVyc2lvbnNcIlxuICApWzBdO1xuICBsZXQgJGRpc3BsYXlGdW5jUmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICBcInNlZS1jb252ZXJzaW9ucy1yZXN1bHRcIlxuICApWzBdO1xuXG4gIC8qKiBTZXQgZXZlbnQgbGlzdGVuZXJzICovXG4gIGxldCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdlbmVyYXRlXCIpO1xuXG4gIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50O1xuXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0ZXN0LmRpc3BsYXlHZW5lcmF0ZWROdW1iZXIoaW5wdXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgJGNvbnZlcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsZXQgbnVtMSA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD4kaW5wdXRPbmUpLnZhbHVlKTtcbiAgICBsZXQgbnVtMiA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD4kaW5wdXRUd28pLnZhbHVlKTtcbiAgICBsZXQgY2hlY2sgPSB0ZXN0LnZhbGlkYXRlSW5wdXQobnVtMSwgbnVtMik7XG4gICAgbGV0IHR5cGVTZWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+JHNlbGVjdFR5cGUpLnZhbHVlO1xuXG4gICAgaWYgKCFjaGVjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRlc3Quc2V0VmFsKG51bTEsIG51bTIpO1xuICAgIHRlc3QuY29udmVydCh0eXBlU2VsLCBudW0xLCBudW0yKTtcbiAgICB0ZXN0LmRpc3BsYXlDb252ZXJ0ZWRWYWx1ZSgkZGlzcGxheUNvbnZlcnNpb24gYXMgSFRNTEVsZW1lbnQsIHR5cGVTZWwpO1xuICB9KTtcblxuICAkY29udmVydEZ1bmNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsZXQgbnVtMSA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD4kaW5wdXRPbmUpLnZhbHVlKTtcbiAgICBsZXQgbnVtMiA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD4kaW5wdXRUd28pLnZhbHVlKTtcbiAgICBsZXQgY2hlY2sgPSB0ZXN0LnZhbGlkYXRlSW5wdXQobnVtMSwgbnVtMik7XG4gICAgbGV0IHR5cGVTZWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+JHNlbGVjdFR5cGUpLnZhbHVlO1xuICAgIGxldCB0eXBlT2ZGdW5jID0gKDxIVE1MSW5wdXRFbGVtZW50PiRzZWxlY3RGdW5jKS52YWx1ZTtcblxuICAgIGlmICghY2hlY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0ZXN0LnNldFZhbChudW0xLCBudW0yKTtcbiAgICB0ZXN0LmNvbnZlcnQodHlwZVNlbCwgbnVtMSwgbnVtMik7XG4gICAgdGVzdC5jaG9vc2VGdW5jdGlvbih0eXBlT2ZGdW5jLCB0eXBlU2VsKTtcblxuICAgIGlmICh0eXBlT2ZGdW5jID09PSBcIkluY3JlbWVudFwiIHx8IHR5cGVPZkZ1bmMgPT09IFwiRGVjcmVtZW50XCIpIHtcbiAgICAgIHRlc3QuZGlzcGxheUluY0RlY1Jlc3VsdChcbiAgICAgICAgJGRpc3BsYXlGdW5jUmVzdWx0IGFzIEhUTUxFbGVtZW50LFxuICAgICAgICB0eXBlU2VsLFxuICAgICAgICB0eXBlT2ZGdW5jXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0ZXN0LmRpc3BsYXlGdW5jdGlvblJlc3VsdChcbiAgICAgICRkaXNwbGF5RnVuY1Jlc3VsdCBhcyBIVE1MRWxlbWVudCxcbiAgICAgIHR5cGVTZWwsXG4gICAgICB0eXBlT2ZGdW5jXG4gICAgKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkb21SZWFkeSA9IChjYWxsQmFjazogKCkgPT4gdm9pZCkgPT4ge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjYWxsQmFjayk7XG4gIH1cbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgIGNhbGxCYWNrKCk7XG4gIH1cbn07XG5cbmRvbVJlYWR5KGluaXREb21TdGF0ZSk7XG4iXX0=
