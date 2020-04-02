import {NgModule} from '@angular/core';
import {ImportComponent} from './import.component';
import {TemplateModule} from '../../template/template.module';

@NgModule({
	declarations: [
		ImportComponent
	],
	exports: [
		ImportComponent
	],
	imports: [
		TemplateModule
	]
})
export class ImportModule {
}
