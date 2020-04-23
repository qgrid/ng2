import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule, LayerModule } from '@qgrid/ngx';
import { PaneComponent } from './pane.component';

@NgModule({
	declarations: [
		PaneComponent,
	],
	exports: [
		PaneComponent,
	],
	imports: [
		CommonModule,
		TemplateModule,
		LayerModule
	]
})
export class PaneModule { }
