import { NgModule } from '@angular/core';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderPanelComponent } from './query-builder-panel.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	imports: [
		TemplateModule
	],
	exports: [
		QueryBuilderComponent,
		QueryBuilderPanelComponent,
	],
	declarations: [
		QueryBuilderComponent,
		QueryBuilderPanelComponent
	]
})
export class QueryBuilderModule {
}
