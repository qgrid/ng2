import { NgModule } from '@angular/core';
import { PagerComponent } from './pager.component';
import { PagerTargetComponent } from './pager-target.component';
import { TemplateModule } from '../../template/template.module';

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
