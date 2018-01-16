import {
	NgModule,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import { PluginModule } from 'ng2-qgrid/plugins';
import { TemplateModule, ThemeService } from 'ng2-qgrid/template';
import { CommonModule } from 'ng2-qgrid/common';
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
    MatListModule
} from '@angular/material';
import { PipeModule } from 'ng2-qgrid/pipes';
import { GridModule } from 'ng2-qgrid/grid.module';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@NgModule({
	declarations: [ThemeComponent],
	exports: [],
	imports: [
		CommonModule,
		BrowserModule,
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
        MatListModule,
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
