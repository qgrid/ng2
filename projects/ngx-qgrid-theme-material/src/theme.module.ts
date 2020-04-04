import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import { SelectModule } from './components/select/select.module';
import { ChipsModule } from './components/chips/chips.module';
import { MenuModule } from './components/menu/menu.module';
import { ThemeOverlayModule } from './components/theme-overlay/theme-overlay.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
	GridModule,
	TemplateModule,
	VscrollModel,
	GridTheme
} from 'ng2-qgrid';

import {
	GridPluginModule,
} from 'ngx-qgrid/plugins';

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

		GridModule,
		GridPluginModule,
		VscrollModel,
		TemplateModule,
		
		SelectModule,
		ThemeOverlayModule,

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
