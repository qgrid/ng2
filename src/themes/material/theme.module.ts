import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MdIconModule, MdButtonModule, MdCheckboxModule,} from '@angular/material';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';
import {TemplateLinkDirective} from '@grid/src/template';

@NgModule({
  declarations: [
    ThemeComponent,
    TemplateLinkDirective
  ],
  exports: [
    ThemeComponent,
    TemplateLinkDirective
  ],
  imports: [
    BrowserModule,
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
