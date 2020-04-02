import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from '../../template/template.module';
import { PaneComponent } from './pane.component';
import { LayerModule } from '../layer/layer.module';

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
