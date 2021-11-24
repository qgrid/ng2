import { NgModule } from '@angular/core';
import { ExportComponent } from './export.component';
import { TemplateModule } from '@qgrid/ngx';

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
