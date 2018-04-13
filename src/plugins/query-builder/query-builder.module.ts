import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderPanelComponent } from './query-builder-panel.component';
import { ValidatorService } from './validation/validator.service';

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
	],
	providers: [
		ValidatorService
	]
})
export class QueryBuilderModule {
}
