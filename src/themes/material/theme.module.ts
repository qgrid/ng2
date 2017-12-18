import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme.service';
import { ThemeComponent } from './theme.component';
import { PluginModule } from 'ng2-qgrid/plugins';
import { TemplateModule } from 'ng2-qgrid/template';
import { CommonModule } from 'ng2-qgrid/common';
import {
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatCheckboxModule,
	MatSelectModule,
	MatTooltipModule,
	MatProgressBarModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatChipsModule,
	MatMenuModule,
	MatDialogModule
} from '@angular/material';
import { PipeModule } from 'ng2-qgrid/pipes';

@NgModule({
	declarations: [
		ThemeComponent
	],
	exports: [
		ThemeComponent,
		PluginModule
	],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		TemplateModule,
		PluginModule,
		MatIconModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSelectModule,
		MatTooltipModule,
		MatProgressBarModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatChipsModule,
		MatDialogModule,
		MatMenuModule,
		MatCardModule,
		PipeModule
	],
	providers: [
		ThemeService
	]
})
export class ThemeModule {
	constructor() {
	}
}
