import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MaterialModule} from "./app.material";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
