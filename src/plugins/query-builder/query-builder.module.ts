import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderPanelComponent } from './query-builder-panel.component';

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
