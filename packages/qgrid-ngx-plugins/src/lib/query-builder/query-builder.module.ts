import { NgModule } from '@angular/core';
import { TemplateModule, GridModelBuilder } from '@qgrid/ngx';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderPanelComponent } from './query-builder-panel.component';
import { QueryBuilderPipe } from './query-builder.pipe';
import { QueryBuilderModel } from './query-builder.model';

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
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder
			.register('queryBuilder', QueryBuilderModel);
	}
}
