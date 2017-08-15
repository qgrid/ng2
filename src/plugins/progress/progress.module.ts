import {NgModule} from '@angular/core';
import {ProgressComponent} from './progress.component';
import {TemplateModule} from '@grid/template';

@NgModule({
	declarations: [
		ProgressComponent
	],
	exports: [
		ProgressComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class ProgressModule {
}
