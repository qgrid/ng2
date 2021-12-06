import { NgModule } from '@angular/core';
import { MarkupDirective } from './markup.directive';
import { StopPropagateDirective } from './stop-propagate.directive';

@NgModule({
	declarations: [
		MarkupDirective,
		StopPropagateDirective,
	],
	exports: [
		MarkupDirective,
		StopPropagateDirective,
	],
})
export class MarkupModule {
}
