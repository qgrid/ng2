import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { PagerTargetComponent } from './pager-target.component';

@NgModule({
	declarations: [
		PagerTargetComponent
	],
	exports: [
		PagerTargetComponent
	],
	imports: [
		TemplateModule
	]
})
export class PagerTargetModule {
}
