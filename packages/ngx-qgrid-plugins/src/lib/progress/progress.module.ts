import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TemplateModule } from '@qgrid/ngx';

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
