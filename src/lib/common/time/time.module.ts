import { NgModule } from '@angular/core';
import { TimeDirective } from './time.directive';

@NgModule({
	declarations: [
		TimeDirective
	],
	exports: [
		TimeDirective
	]
})
export class TimeModule {
}
