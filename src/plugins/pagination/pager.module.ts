import { NgModule } from '@angular/core';
import { PagerComponent } from './pager.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		PagerComponent
	],
	exports: [
		PagerComponent
	],
	imports: [
		TemplateModule
	]
})
export class PagerModule {
}
