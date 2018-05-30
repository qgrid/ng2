import {NgModule} from '@angular/core';
import {ExportComponent} from './export.component';
import {TemplateModule} from '../../template/template.module';

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
