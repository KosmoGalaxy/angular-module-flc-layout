import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FlcLayoutModule} from "../flc-layout/flc-layout.module";
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlcLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
