import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	removeNgStyles,
	createNewHosts,
	createInputTransfer
} from '@angularclass/hmr';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatCardModule
} from '@angular/material';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataService } from '../data/data.service';

import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent, HomeComponent, NoContentComponent],
	imports: [
		// import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, {
			useHash: true,
			preloadingStrategy: PreloadAllModules
		}),
		GridModule,
		ThemeModule,
		NoopAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatCardModule,
		FlexLayoutModule
	],
	providers: [DataService],
	entryComponents: []
})
export class AppModule {}
