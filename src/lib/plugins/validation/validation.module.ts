import {NgModule} from '@angular/core';
import {ValidatorComponent} from './validator.component';
import {TemplateModule} from '../../template/template.module';
import { RuleComponent } from './rule.component';

@NgModule({
	declarations: [
		ValidatorComponent,
		RuleComponent
	],
	exports: [
		ValidatorComponent,
		RuleComponent
	],
	imports: [
		TemplateModule
	]
})
export class ValidationModule {
}
