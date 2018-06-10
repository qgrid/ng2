import {
	NgModule,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import {
	PluginModule,
	CommonModule as GridCommonModule,
	TemplateModule,
	TemplateService,
	PipeModule,
	GridModule,
	RootService,
	VscrollModule,
	ThemeService
} from '../../lib/public-api';

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
	providers: [
		ThemeService
	],
	entryComponents: [
		ThemeComponent
	]
})
export class ThemeModule {
	constructor(
		theme: ThemeService,
		componentResolver: ComponentFactoryResolver
	) {
		theme.name = 'basic';
		theme.component = ThemeComponent;
	}
}
