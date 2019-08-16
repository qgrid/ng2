import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import { SelectModule } from './components/select/select.module';
import { ChipsModule } from './components/chips/chips.module';
import { MenuModule } from './components/menu/menu.module';
import { ThemeOverlayModule } from './components/theme-overlay/theme-overlay.module';
import {
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
	MatRadioModule,
	MatSelectModule,
	MatToolbarModule,
	MatTooltipModule,
} from '@angular/material';
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
		MatRadioModule,
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
	entryComponents: [
		ThemeComponent
	]
})
export class ThemeModule {
	constructor(theme: ThemeService) {
		theme.name = 'material';
		theme.component = ThemeComponent;
	}
}
