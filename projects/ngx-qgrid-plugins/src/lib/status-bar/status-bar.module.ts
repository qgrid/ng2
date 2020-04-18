import { NgModule } from '@angular/core';
import { TemplateModule } from '@qgrid/ngx';
import { StatusBarComponent } from './status-bar.component';

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
