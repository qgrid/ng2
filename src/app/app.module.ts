import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ExampleModule, EXAMPLES, APP_ROUTES } from '../examples/example.module';

import { FilterSearchPipe } from './app.filter.pipe';
import { HighlightPipe } from './app.highlight.pipe';

@NgModule({
	declarations: [
		AppComponent,
		FilterSearchPipe,
		HighlightPipe
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
		MatInputModule,
		MatButtonModule,
		RouterModule.forRoot([{
			path: '',
			redirectTo: 'action-bar-basic',
			pathMatch: 'full'
		}]),
		ExampleModule,
		FormsModule
	],
	bootstrap: [AppComponent],
	entryComponents: EXAMPLES
})
export class AppModule {
	constructor(router: Router) {
		router.config.unshift(...APP_ROUTES);
	}
}
