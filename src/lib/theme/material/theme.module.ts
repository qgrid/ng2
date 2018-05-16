import {
	NgModule,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector	
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import { PluginModule } from '../../plugins/plugin.module';
import { CommonModule as GridCommonModule } from '../../common/common.module';
import { TemplateService } from '../../template/template.service';
import { TemplateModule } from '../../template/template.module';
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
import { PipeModule } from '../../pipes/pipe.module';
import { GridModule } from '../../grid.module';
import { RootService } from '../../infrastructure/component/root.service';
import { VscrollModule } from '../../common/vscroll/vscroll.module';
import { ThemeService } from '../../template/theme.service';

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
