import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES, ExampleModule } from '../examples/example.module';
import { AppComponent } from './app.component';
import { FilterSearchPipe } from './app.filter.pipe';
import { HighlightPipe } from './app.highlight.pipe';



@NgModule({
  declarations: [
    AppComponent,
    FilterSearchPipe,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'action-bar-basic',
        pathMatch: 'full',
      },
    ]),
    ExampleModule,
    FormsModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  constructor(router: Router) {
    router.config.unshift(...APP_ROUTES);
  }
}
