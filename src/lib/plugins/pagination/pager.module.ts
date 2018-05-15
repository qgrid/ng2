import { NgModule } from '@angular/core';
import { PagerComponent } from './pager.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { PagerTargetComponent } from 'ng2-qgrid/plugins/pagination/pager-target.component';

@NgModule({
	declarations: [
		PagerComponent,
		PagerTargetComponent
	],
	exports: [
		PagerComponent,
		PagerTargetComponent
	],
	imports: [
		TemplateModule
	]
})
export class PagerModule {
}
