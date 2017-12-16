import { NgModule } from '@angular/core';
import { ColumnSortComponent } from './column-sort.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		ColumnSortComponent
	],
	exports: [
		ColumnSortComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class ColumnSortModule {
}
