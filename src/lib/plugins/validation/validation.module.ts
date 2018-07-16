import {NgModule} from '@angular/core';
import {ValidationComponent} from './validation.component';
import {TemplateModule} from '../../template/template.module';
import { RuleComponent } from './rule.component';

@NgModule({
	declarations: [
		ValidationComponent,
		RuleComponent
	],
	exports: [
		ValidationComponent,
		RuleComponent
	],
	imports: [
		TemplateModule
	]
})
export class ValidationModule {
}
