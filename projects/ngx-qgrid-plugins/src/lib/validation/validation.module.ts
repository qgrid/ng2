import { NgModule } from '@angular/core';
import { ValidatorComponent } from './validator.component';
import { RuleComponent } from './rule.component';
import { ValidationComponent } from './validation.component';
import { TemplateModule } from '@qgrid/ngx';

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
