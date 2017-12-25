import { NgModule, ComponentFactoryResolver } from '@angular/core';
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
	MatDatepickerModule,
	MatNativeDateModule,
	MatChipsModule,
	MatMenuModule,
	MatDialogModule
} from '@angular/material';
import { PipeModule } from 'ng2-qgrid/pipes';

@NgModule({
	declarations: [ThemeComponent],
	exports: [],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		TemplateModule,
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
		const factory = componentResolver.resolveComponentFactory(ThemeComponent);
		theme.componentFactory = injector => factory.create(injector);
	}
}
