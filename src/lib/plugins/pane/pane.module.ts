import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from '../../template/template.module';
import { PaneTriggerComponent } from './pane-trigger.component';
import { PaneComponent } from './pane.component';
import { LayerModule } from '../layer/layer.module';

@NgModule({
	declarations: [
		PaneTriggerComponent,
		PaneComponent,
	],
	exports: [
		PaneTriggerComponent,
		PaneComponent,
	],
	imports: [
		CommonModule,
		TemplateModule,
		LayerModule
	]
})
export class PaneModule { }
