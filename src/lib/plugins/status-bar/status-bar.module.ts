import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { StatusBarComponent } from 'ng2-qgrid/plugins/status-bar/status-bar.component';

@NgModule({
	declarations: [
		StatusBarComponent
	],
	exports: [
		StatusBarComponent
	],
	imports: [
		TemplateModule
	]
})
export class StatusBarModule {
}
