import createElement from "../functions/create_element.js";

export default class Cell {
  constructor() {
    this._tagName = "td";
    this._dataNumber;
    this._childImgSrc = "@img/Roman.jpg";
  }

  get tagName() {
    return this._tagName;
  }

  get childImgSrc() {
    return this._childImgSrc;
  }

  createCell(parentElement) {
    const tableCell = createElement(this.tagName, "");
    const cellImg = createElement("img", "");
    cellImg.src = this.childImgSrc;
    tableCell.append(cellImg);
    parentElement.append(tableCell);
  }
}
