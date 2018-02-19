import {LayoutElement} from "./layout-element";

export class Branch {

  private _layoutElement: LayoutElement;
  private _nativeElement: HTMLElement;
  private _branches: Branch[] = [];

  constructor(layoutElement: LayoutElement, nativeElement: HTMLElement) {
    this._layoutElement = layoutElement;
    this._nativeElement = nativeElement;
  }

  addBranch(node: Branch) {
    this._branches.push(node);
  }

}
