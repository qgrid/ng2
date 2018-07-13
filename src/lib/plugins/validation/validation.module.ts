import {NgModule} from '@angular/core';
import {ValidationComponent} from './validation.component';
import {TemplateModule} from '../../template/template.module';

@NgModule({
	declarations: [
		ValidationComponent
	],
	exports: [
		ValidationComponent
	],
	imports: [
		TemplateModule
	]
})
export class ValidationModule {
}
