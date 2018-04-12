import { NgModule } from '@angular/core';
import { QueryBuilderComponent } from './query-builder.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	imports: [
		TemplateModule
	],
	exports: [
		QueryBuilderComponent
	],
	declarations: [
		QueryBuilderComponent
	]
})
export class QueryBuilderModule {
}
