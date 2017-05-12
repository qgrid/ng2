import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {
  MdIconModule,
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule
} from '@angular/material';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';
import {TemplateLinkDirective} from '@grid/src/template';
import {PagerModule} from "../../plugins/pagination/pager.module";

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
    FormsModule,
    PagerModule,
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
  ],
  providers: [
    ThemeService
  ]
})
export class ThemeModule {
  constructor() {
  }
}
