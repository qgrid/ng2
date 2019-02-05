import { NgModule } from '@angular/core';
import { DateDirective } from './date.directive';

@NgModule({
	declarations: [
		DateDirective
	],
	exports: [
		DateDirective
	]
})
export class DateModule {
}
