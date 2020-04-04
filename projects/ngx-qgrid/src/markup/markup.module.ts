import { NgModule } from '@angular/core';
import { MarkupDirective } from './markup.directive';

@NgModule({
	declarations: [
		MarkupDirective
	],
	exports: [
		MarkupDirective
	],
})
export class MarkupModule {
}
