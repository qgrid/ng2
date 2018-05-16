import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TemplateModule } from '../../template/template.module';

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
