import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ThemeService} from './theme.service';
import {ThemeComponent} from './theme.component';
import {ChipListComponent} from './custom/chip-list.component';
import {PluginModule} from '@grid/plugins';
import {TemplateModule} from '@grid/template';
import {CommonModule} from '@grid/common';

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
		ChipListComponent
	],
	exports: [
		ThemeComponent,
		ChipListComponent
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
