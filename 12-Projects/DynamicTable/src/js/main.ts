interface TableInterface {
  x: string[];
  y: string[];
  wrapper: HTMLElement;
  data: DataPair[];

  setWrapper(wrap: HTMLElement): HTMLElement;
  draw(): void;
  addRow(rowName: string): void;
  addCol(colName: string): void;
  loggingData(): void;
}

interface DataPair {
  x: string;
  y: string;
  value: boolean;
}

class Table implements TableInterface {
  x: string[] = [];
  y: string[] = [];
  wrapper: HTMLElement;
  data = [
    { x: "Col1", y: "Row1", value: true },
    { x: "Col2", y: "Row3", value: true }
  ];

  /* Step 1 */
  public setWrapper(wrap: HTMLElement): HTMLElement {
    return (this.wrapper = wrap);
  }
  /* Step 2 */
  public draw(): void {
    if (!this.wrapper) {
      console.log("Error! No wrapper!");
      return;
    }

    this.wrapper.innerHTML = "";
    /* Step 3 */
    let tableDom = this.buildTableDom();
    this.wrapper.append(tableDom);
    this.initEvents();
    // this.loggingData();
  }
  /* Step 3 */
  private buildTableDom(): HTMLElement {
    let tableDom = document.createElement("table");
    tableDom.classList.add("table");

    let tableHeaders = this.buildTableHeaders(); /* Step 4 */
    tableDom.append(tableHeaders);

    let tableBody = this.buildTableBody(); /* Step 5 */
    tableDom.append(tableBody);

    return tableDom;
  }
  /* Step 4 */
  private buildTableHeaders(): HTMLElement {
    let tableHead = document.createElement("thead");
    let tableHeadRow = document.createElement("tr");
    let emptyCell = document.createElement("th");
    tableHeadRow.append(emptyCell);

    for (let thName of this.x) {
      let headCell = document.createElement("th");
      headCell.innerHTML = thName;
      tableHeadRow.append(headCell);
    }

    tableHead.append(tableHeadRow);
    return tableHead;
  }
  /* Step 5 */
  private buildTableBody(): HTMLElement {
    let tableBodyDom = document.createElement("tbody");
    for (let i in this.y) {
      let y = +i;
      let tableBodyRow = this.buildTableBodyRow(y); /* Step 6 */
      tableBodyDom.append(tableBodyRow);
    }
    return tableBodyDom;
  }
  /* Step 6 */
  private buildTableBodyRow(rowIndex: number): HTMLElement {
    let rowDom = document.createElement("tr");
    let rowName = this.y[rowIndex];
    let rowNameCell = document.createElement("td");
    rowNameCell.innerHTML = rowName;
    rowDom.append(rowNameCell);

    for (let i in this.x) {
      let y = +i;
      let tableCellDom = this.buildTableCellDom(y, rowIndex); /* Step 7 */
      rowDom.append(tableCellDom);
    }
    return rowDom;
  }
  /* Step 7 */
  private buildTableCellDom(colIndex: number, rowIndex: number): HTMLElement {
    let cellDom = document.createElement("td");
    let rowName = this.y[rowIndex];
    let colName = this.x[colIndex];
    let cellValue = false;

    let dataPair = this.data.filter(function(obj) {
      return obj.x == colName && obj.y == rowName;
    });

    if (dataPair.length > 0 && dataPair[0].value) {
      cellValue = true;
    }

    let checkBox: any = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = "test";
    if (cellValue) {
      checkBox.setAttribute("checked", "checked");
    }

    let checkBoxData = { colIndex: colIndex, rowIndex: rowIndex };
    checkBox.setAttribute("position", checkBoxData);

    cellDom.append(checkBox);
    return cellDom;
  }
  /* Step 8 */
  private initEvents(): void {
    if (this.wrapper) {
      this.wrapper.addEventListener("change", event => {
        // event.target
        // 'input[type="checkbox"]'
        // https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
        // This is refered to this.wrapper
        let checkBox = document.getElementById("test");
        let checkBoxData = Object(
          (<HTMLInputElement>checkBox).getAttribute("position")
        );
        /* Step 9 */
        // let checkBoxData = $(this).data("position");
        if (!checkBoxData) {
          return;
        }

        let value = Boolean(
          (<HTMLInputElement>checkBox).getAttribute("checked")
        );
        console.log(value);
        this.addDataPairByIndex(
          checkBoxData.rowIndex,
          checkBoxData.colIndex,
          value
        );

        this.draw();
      });
    }
  }
  /* Step 9 */
  private addDataPairByIndex(
    rowIndex: number,
    colIndex: number,
    value: boolean
  ): void {
    let colName: string = this.x[colIndex];
    let rowName: string = this.y[rowIndex];
    let dataPair: DataPair = { x: colName, y: rowName, value: value };
    this.addDataPair(dataPair);
  }
  /* Step 10 */
  private addDataPair(dataPair: DataPair): void {
    let index: null | number = null;

    for (let i in this.data) {
      if (this.data[i].x == dataPair.x && this.data[i].y == dataPair.y) {
        index = parseInt(i);
      }
    }

    if (index !== null) {
      this.data[index] = dataPair;
    } else {
      this.data.push(dataPair);
    }
  }
  /* Step 11 */
  public addRow(rowName: string): void {
    this.y.push(rowName);
  }
  public addCol(colName: string): void {
    this.x.push(colName);
  }
  /* Step 12 (For console log data) */
  public loggingData(): void {
    console.log("Data logging: ");
    console.log("---------------------------------------");
    console.log("Array x");
    console.log(this.x);
    console.log("---------------------------------------");
    console.log("Array y");
    console.log(this.y);
    console.log("---------------------------------------");
    console.log("Array data");
    console.log(this.data);
  }
}

const initDomState = () => {
  let test = new Table();
  let tableWrapper = document.getElementById("tableWrapper");
  test.setWrapper(tableWrapper as HTMLElement);
  /* Enter the data */
  let axes = {
    x: ["Col1", "Col2", "Col3", "Col4", "Col5"],
    y: ["Row1", "Row2", "Row3"]
  };

  for (let i of axes.y) {
    test.addRow(i);
  }
  for (let i of axes.x) {
    test.addCol(i);
  }

  test.draw();
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
