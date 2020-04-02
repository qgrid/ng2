import { NgModule } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderPanelComponent } from './query-builder-panel.component';
import { QueryBuilderPipe } from './query-builder.pipe';

@NgModule({
	imports: [
		TemplateModule
	],
	exports: [
		QueryBuilderComponent,
		QueryBuilderPanelComponent,
		QueryBuilderPipe
	],
	declarations: [
		QueryBuilderComponent,
		QueryBuilderPanelComponent,
		QueryBuilderPipe
	]
})
export class QueryBuilderModule {
}
