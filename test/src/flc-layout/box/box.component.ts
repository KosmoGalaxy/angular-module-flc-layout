import {Component, ElementRef} from '@angular/core';
import {LayoutElementComponent} from "../layout-element.component";
import {LayoutService} from "../layout.service";

@Component({
  selector: 'flc-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent extends LayoutElementComponent {

  constructor(
    element: ElementRef,
    layoutService: LayoutService
  ) {
    super(element, layoutService);
  }

}
