import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		ProgressComponent
	],
	exports: [
		ProgressComponent
	],
	imports: [
		TemplateModule
	]
})
export class ProgressModule {
}
