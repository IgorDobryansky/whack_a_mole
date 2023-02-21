import createElement from "../functions/create_element.js";

export default class Cell {
  constructor() {
    this._tagName = "td";
    this._dataNumber;
  }

  get tagName() {
    return this._tagName;
  }

  get childImgSrc() {
    return this._childImgSrc;
  }

  createCell(parentElement) {
    const tableCell = createElement(this.tagName, "");
    parentElement.append(tableCell);
    return tableCell;
  }
}
