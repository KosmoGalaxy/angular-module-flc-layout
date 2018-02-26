import {NgModule} from '@angular/core';
import {BoxComponent} from "./box/box.component";
import {LayoutService} from "./layout.service";

@NgModule({
  declarations: [
    BoxComponent
  ],
  exports: [
    BoxComponent
  ],
  imports: [
  ],
  providers: [
    LayoutService
  ]
})
export class FlcLayoutModule {}
