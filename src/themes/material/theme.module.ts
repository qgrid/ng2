import {NgModule} from '@angular/core';
import {MdIconModule, MdButtonModule, MdCheckboxModule} from '@angular/material';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';

@NgModule({
  declarations: [
    ThemeComponent
  ],
  exports: [
    ThemeComponent
  ],
  imports: [
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  providers: [
    ThemeService
  ]
})
export class ThemeModule {
  constructor() {
  }
}
