import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatSelectModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { exampleRoutes, ExampleModule } from '../examples/example.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forRoot(
      exampleRoutes,
      {
        enableTracing: false
      }
    ),
    ExampleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
