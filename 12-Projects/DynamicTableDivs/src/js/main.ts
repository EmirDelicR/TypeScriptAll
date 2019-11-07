interface TableInterface {
  x: string[];
  y: number[];
  wrapper: HTMLElement;
  data: Object[];

  setWrapper(wrap: HTMLElement): HTMLElement;
  draw(): void;
  addRow(rowName: number): void;
  addCol(colName: string): void;
  loggingData(): void;
}

class Table implements TableInterface {
  x: string[] = [];
  y: number[] = [];
  wrapper: HTMLElement;
  data: { [key: string]: string }[];

  constructor(data: { [key: string]: string }[]) {
    this.data = data;
  }
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
    const tableDom = this.buildTableDom();
    this.wrapper.append(tableDom);

    this.loggingData();
  }
  /* Step 3 */
  private buildTableDom(): HTMLElement {
    const tableDom = document.createElement("div");
    tableDom.classList.add("table");

    const tableHeaders = this.buildTableHeaders(); /* Step 4 */
    tableDom.append(tableHeaders);

    this.buildTableBody(tableDom); /* Step 5 */

    return tableDom;
  }
  /* Step 4 */
  private buildTableHeaders(): HTMLElement {
    const tableHeadRow = document.createElement("div");
    tableHeadRow.classList.add("t-row", "t-header");
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("empty", "black");
    tableHeadRow.append(emptyCell);

    for (let thName of this.x) {
      const headCell = document.createElement("div");
      headCell.classList.add("t-cell");
      headCell.innerHTML = thName;
      tableHeadRow.append(headCell);
    }

    return tableHeadRow;
  }
  /* Step 5 */
  private buildTableBody(tableDom: HTMLElement) {
    for (let index of this.y) {
      const tableBodyRow = this.buildTableBodyRow(index); /* Step 6 */
      tableDom.append(tableBodyRow);
    }
  }
  /* Step 6 */
  private buildTableBodyRow(rowIndex: number): HTMLElement {
    let rowDom = document.createElement("div");
    rowDom.classList.add("t-row", "t-body");

    const rowNameCell = document.createElement("div");
    rowNameCell.classList.add("empty");
    rowNameCell.innerHTML = `${rowIndex + 1}`;

    rowDom.append(rowNameCell);

    for (let key of this.x) {
      rowDom = this.buildTableCellDom(key, rowIndex, rowDom);
    }

    return rowDom;
  }
  /* Step 7 */
  private buildTableCellDom(
    key: string,
    rowIndex: number,
    rowDom: HTMLDivElement
  ): HTMLDivElement {
    let cell = document.createElement("div");
    cell.classList.add("t-cell");
    const rowData = this.data[rowIndex];
    cell.innerHTML = `${rowData[key]}`;

    rowDom.append(cell);

    return rowDom;
  }
  public addRow(rowName: number): void {
    this.y.push(rowName);
  }
  public addCol(colName: string): void {
    this.x.push(colName);
  }
  /* Step 12 (For console log data) */
  public loggingData(): void {
    console.log("Data logging: ");
    console.log(this.data);
    console.log("#######################################");
  }
}

const initDomState = () => {
  const data = [
    {
      name: "Test Name",
      gander: "Test Gander",
      date: "Test date",
      place: "Test Place",
      city: "Test City",
      pizza: "Test Pizza",
      pizza2: "Test Pizza 2"
    },
    {
      name: "Test Name 2",
      gander:
        "Test Gander ####################### some long text to see if breaks",
      date: ">>>>>>>Test date second",
      place: "Test Place second",
      city: "Test City second",
      pizza: "Test Pizza second",
      pizza2: "Test Pizza second 2"
    }
  ];

  let test = new Table(data);
  let tableWrapper = document.getElementById("tableWrapper");
  test.setWrapper(tableWrapper as HTMLElement);

  let axes = {
    x: Object.keys(data[0]),
    y: [
      ...Array(data.length)
        .fill(null)
        .map((x, i) => i)
    ]
  };

  for (let i of axes.y) {
    test.addRow(i);
  }

  for (let i of axes.x) {
    test.addCol(i);
  }
  test.draw();

  const colWidth = 94 / Object.keys(data[0]).length;
  const cells = document.getElementsByClassName("t-cell");
  for (let cell of cells) {
    (<HTMLElement>cell).style.width = `${colWidth}%`;
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

domReady(initDomState);
