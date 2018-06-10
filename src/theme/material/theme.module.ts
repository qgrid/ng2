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
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatCheckboxModule,
	MatSelectModule,
	MatTooltipModule,
	MatProgressBarModule,
	MatInputModule,
	MatFormFieldModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatChipsModule,
	MatMenuModule,
	MatDialogModule,
	MatListModule,
	MatAutocompleteModule,
	MatOptionModule,
	MatToolbarModule
} from '@angular/material';
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
		MatAutocompleteModule,
		MatListModule,
		MatToolbarModule,
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
		theme.name = 'material';
		theme.component = ThemeComponent;
	}
}
