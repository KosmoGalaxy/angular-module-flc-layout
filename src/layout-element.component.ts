import {Component, ElementRef, OnInit} from '@angular/core';
import {LayoutService} from "./layout.service";

@Component({
  selector: 'app-layout-element',
  templateUrl: './layout-element.component.html',
  styleUrls: ['./layout-element.component.css']
})
export class LayoutElementComponent {

  nativeDepth: number;
  layoutParent: LayoutElementComponent;

  constructor(
    private _element: ElementRef,
    layoutService: LayoutService
  ) {
    layoutService.registerLayoutElement(this, _element.nativeElement);
  }

  getNativeParents(): HTMLElement[] {
    const element: HTMLElement = this._element.nativeElement;
    const parents: HTMLElement[] = [];
    let parent: HTMLElement = <HTMLElement>element.parentNode;
    parents.push(parent);
    while (!parent.isSameNode(document.body)) {
      parent = <HTMLElement>parent.parentNode;
      parents.push(parent);
    }
    return parents;
  }

}
