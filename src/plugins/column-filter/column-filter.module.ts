import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { ColumnFilterComponent } from './column-filter.component';
import { ColumnFilterTriggerComponent } from './column-filter-trigger.component';
import { ChipComponent } from 'ng2-qgrid/plugins/column-filter/column-filter-chip/chip.component';

@NgModule({
	declarations: [
		ColumnFilterComponent,
		ColumnFilterTriggerComponent
	],
	exports: [
		ColumnFilterComponent,
		ColumnFilterTriggerComponent
	],
	imports: [
		TemplateModule
	]
})
export class ColumnFilterModule { }
