import { NgModule } from '@angular/core';
import { ChipsDirective } from './chips.directive';
import { ChipsPushDirective } from './chips-push.directive';
import { ChipsRemoveDirective } from './chips-remove.directive';

@NgModule({
	declarations: [
		ChipsDirective,
		ChipsPushDirective,
		ChipsRemoveDirective,
	],
	exports: [
		ChipsDirective,
		ChipsPushDirective,
		ChipsRemoveDirective,
	]
})
export class ChipsModule {
}
