import { NgModule } from '@angular/core';
import { ColumnSortComponent } from './column-sort.component';
import { TemplateModule } from 'ngx-qgrid';

@NgModule({
	declarations: [
		ColumnSortComponent
	],
	exports: [
		ColumnSortComponent
	],
	imports: [
		TemplateModule
	]
})
export class ColumnSortModule {
}
