import { NgModule } from '@angular/core';
import { ColumnFilterByComponent } from 'ng2-qgrid/plugins/column-filter/column-filter-by/column-filter-by.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		ColumnFilterByComponent
	],
	exports: [
		ColumnFilterByComponent
	],
	imports: [
		TemplateModule
	]
})
export class ColumnFilterByModule { }
