import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { AppComponent } from './app.component';

import { GridModule, ThemeModule } from '../lib/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GridModule,
    ThemeModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
