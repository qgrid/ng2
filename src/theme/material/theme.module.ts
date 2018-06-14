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
import { SelectModule } from './components/select/select.module';
import { ChipsModule } from './components/chips/chips.module';
import { MenuModule } from './components/menu/menu.module';
import { ThemeOverlayModule } from './components/theme-overlay/theme-overlay.module';

@NgModule({
	declarations: [
		ThemeComponent
	],
	exports: [
		ThemeComponent
	],
	imports: [
		ChipsModule,
		CommonModule,
		FormsModule,
		GridCommonModule,
		GridModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatSelectModule,
		MatToolbarModule,
		MatTooltipModule,
		MenuModule,
		PipeModule,
		PluginModule,
		SelectModule,
		TemplateModule,
		ThemeOverlayModule,
		VscrollModule,
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
