import {NgModule, Injectable} from '@angular/core';
import {MdIconModule, MdButtonModule, MdCheckboxModule} from "@angular/material";

@Injectable()
export class Theme {
  name = 'material';

  constructor() {
  }
}

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  providers: [
    Theme
  ]
})
export class ThemeModule {
  constructor() {
  }
}
