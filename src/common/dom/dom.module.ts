import {NgModule} from '@angular/core';
import {InputBlurDirective} from '../focus/blur.directive';

@NgModule({
	declarations: [
		InputBlurDirective
	],
	exports: [
		InputBlurDirective
	],
	imports: [],
	providers: []
})
export class DomEventsModule {
}
