import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';
import {EditChipListComponent} from './components/edit-chip-list/edit-chip-list.component';
import {PluginModule} from 'ng2-qgrid/plugins';
import {TemplateModule} from 'ng2-qgrid/template';
import {CommonModule} from 'ng2-qgrid/common';

import {
	MdIconModule,
	MdButtonModule,
	MdCheckboxModule,
	MdSelectModule,
	MdTooltipModule,
	MdProgressBarModule,
	MdInputModule,
	MdDatepickerModule,
	MdNativeDateModule,
	MdChipsModule
} from '@angular/material';

@NgModule({
	declarations: [
		ThemeComponent,
		EditChipListComponent
	],
	exports: [
		ThemeComponent,
		EditChipListComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		TemplateModule,
		PluginModule,
		MdIconModule,
		MdButtonModule,
		MdCheckboxModule,
		MdSelectModule,
		MdTooltipModule,
		MdProgressBarModule,
		MdInputModule,
		MdDatepickerModule,
		MdNativeDateModule,
		MdChipsModule
	],
	providers: [
		ThemeService
	]
})
export class ThemeModule {
	constructor() {
	}
}
