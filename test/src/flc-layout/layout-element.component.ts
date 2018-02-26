import {AfterViewInit, ElementRef} from '@angular/core';
import {LayoutService} from "./layout.service";
import {NativeElement} from "./native-element";

export class LayoutElementComponent implements AfterViewInit {

  nativeDepth: number;
  layoutParent: LayoutElementComponent;

  get nativeElement(): NativeElement { return this._element.nativeElement; }

  constructor(
    private _element: ElementRef,
    private _layoutService: LayoutService
  ) {}

  ngAfterViewInit() {
    this._layoutService.registerLayoutElement(this);
  }

  getNativeParents(): NativeElement[] {
    const element: NativeElement = this._element.nativeElement;
    const parents: NativeElement[] = [];
    let parent: NativeElement = <NativeElement>element.parentNode;
    parents.push(parent);
    while (!parent.isSameNode(document.body)) {
      parent = <NativeElement>parent.parentNode;
      parents.push(parent);
    }
    return parents;
  }

}
