import {NgModule} from '@angular/core';
import {ExportComponent} from './export.component';
import {TemplateModule} from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		ExportComponent
	],
	exports: [
		ExportComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class ExportModule {
}
