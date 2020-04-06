import { NgModule } from '@angular/core';
import { TemplateModule } from 'ngx-qgrid';
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
