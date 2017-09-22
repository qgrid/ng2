import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TemplateModule } from 'ng2-qgrid/template';

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
