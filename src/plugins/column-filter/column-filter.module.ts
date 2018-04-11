import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { ColumnFilterComponent } from './column-filter.component';
import { ColumnFilterTriggerComponent } from './column-filter-trigger.component';
import { ColumnFilterByComponent } from 'ng2-qgrid/plugins/column-filter/column-filter-by/column-filter-by.component';

@NgModule({
	declarations: [
		ColumnFilterComponent,
		ColumnFilterTriggerComponent,
		ColumnFilterByComponent
	],
	exports: [
		ColumnFilterComponent,
		ColumnFilterTriggerComponent,
		ColumnFilterByComponent
	],
	imports: [
		TemplateModule
	]
})
export class ColumnFilterModule { }
