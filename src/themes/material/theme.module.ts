import {NgModule, Injectable} from '@angular/core';
import {MdIconModule, MdButtonModule, MdCheckboxModule} from '@angular/material';
import {TemplateLinkDirective} from '@grid/src/template';

@Injectable()
export class Theme {
  name = 'material';

  constructor() {
  }
}

@NgModule({
  declarations: [
    TemplateLinkDirective
  ],
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
