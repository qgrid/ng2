import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {
  MdIconModule,
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule,
  MdTooltipModule
} from '@angular/material';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';
import {PluginModule} from "../../plugins";
import {TemplateModule} from "../../template";

@NgModule({
  declarations: [
    ThemeComponent
  ],
  exports: [
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TemplateModule,
    PluginModule,
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdTooltipModule
  ],
  providers: [
    ThemeService
  ]
})
export class ThemeModule {
  constructor() {
  }
}
