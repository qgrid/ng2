import { NgModule } from '@angular/core';
import { ChipsDirective } from './chips.directive';

@NgModule({
	declarations: [
		ChipsDirective
	],
	exports: [
		ChipsDirective
	]
})
export class ChipsModule {
}
