import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import {
	PluginModule,
	CommonModule as GridCommonModule,
	TemplateModule,
	PipeModule,
	GridModule,
	VscrollModule,
	ThemeService
} from 'ng2-qgrid';

@NgModule({
	declarations: [
		ThemeComponent
	],
	exports: [
		ThemeComponent
	],
	imports: [
		CommonModule,
		GridCommonModule,
		FormsModule,
		TemplateModule,
		GridModule,
		PluginModule,
		PipeModule,
		VscrollModule
	],
	entryComponents: [
		ThemeComponent
	]
})
export class ThemeModule {
	constructor(theme: ThemeService) {
		theme.name = 'basic';
		theme.component = ThemeComponent;
	}
}
