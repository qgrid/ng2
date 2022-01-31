import { NgModule } from '@angular/core';
import { ColumnComponent } from './column.component';
import { ColumnBodyTemplateDirective } from './column-body-template.directive';
import { ColumnEditTemplateDirective } from './column-edit-template.directive';
import { ColumnFootTemplateDirective } from './column-foot-template.directive';
import { ColumnHeadTemplateDirective } from './column-head-template.directive';
@NgModule({
	declarations: [
		ColumnComponent,
		ColumnBodyTemplateDirective,
		ColumnEditTemplateDirective,
		ColumnFootTemplateDirective,
		ColumnHeadTemplateDirective
	],
	exports: [
		ColumnComponent,
		ColumnBodyTemplateDirective,
		ColumnEditTemplateDirective,
		ColumnFootTemplateDirective,
		ColumnHeadTemplateDirective
	]
})
export class ColumnModule {
}
