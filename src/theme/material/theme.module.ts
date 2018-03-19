import {
	NgModule,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import { PluginModule } from 'ng2-qgrid/plugins/plugin.module';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { TemplateService } from 'ng2-qgrid/template/template.service';
import { CommonModule as GridCommonModule } from 'ng2-qgrid/common/common.module';
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
	MatDialogModule
} from '@angular/material';
import { PipeModule } from 'ng2-qgrid/pipes/pipe.module';
import { GridModule } from 'ng2-qgrid/grid.module';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ThemeService } from 'ng2-qgrid/template/theme.service';

@NgModule({
	declarations: [ThemeComponent],
	exports: [],
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
		PipeModule
	],
	providers: [ThemeService],
	entryComponents: [ThemeComponent]
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
