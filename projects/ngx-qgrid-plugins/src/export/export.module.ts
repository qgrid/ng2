import { NgModule } from '@angular/core';
import { ExportComponent } from './export.component';
import { TemplateModule } from 'ngx-qgrid';

@NgModule({
	declarations: [
		ExportComponent
	],
	exports: [
		ExportComponent
	],
	imports: [
		TemplateModule
	]
})
export class ExportModule {
}
