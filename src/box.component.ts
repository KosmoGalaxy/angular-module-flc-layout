import {Component, ElementRef, OnInit} from '@angular/core';
import {LayoutElement} from "./layout-element";
import {LayoutTreeService} from "./layout-tree.service";

@Component({
  selector: 'app-box',
  templateUrl: '../test/src/app/box/box.component.html',
  styleUrls: ['../test/src/app/box/box.component.css']
})
export class BoxComponent implements LayoutElement, OnInit {

  constructor(
    element: ElementRef,
    layoutTreeService: LayoutTreeService
  ) {
    layoutTreeService.registerLayoutElement(this, element.nativeElement);
  }

  ngOnInit() {

  }

}
