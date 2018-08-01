import { NgModule } from '@angular/core';
import { ValidatorComponent } from './validator.component';
import { TemplateModule } from '../../template/template.module';
import { RuleComponent } from './rule.component';
import { ValidationComponent } from './validation.component';

@NgModule({
	declarations: [
		ValidationComponent,
		ValidatorComponent,
		RuleComponent
	],
	exports: [
		ValidationComponent,
		ValidatorComponent,
		RuleComponent
	],
	imports: [
		TemplateModule
	]
})
export class ValidationModule {
}
