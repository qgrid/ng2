import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TemplateModule } from 'ngx-qgrid';

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
