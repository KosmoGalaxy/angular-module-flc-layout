import {Injectable} from '@angular/core';
import {LayoutElement} from "./layout-element";
import {Tree} from "./tree";

@Injectable()
export class LayoutTreeService {

  private _tree: Tree;
  get tree(): Tree { return this._tree; }

  constructor() {
    this._setupTree();
  }

  registerBranch(layoutElement: LayoutElement, nativeElement: HTMLElement) {

  }

  private _setupTree() {
    this._tree = new Tree(<HTMLBodyElement>document.body);
  }

}
