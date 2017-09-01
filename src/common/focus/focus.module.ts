import {NgModule} from '@angular/core';
import {FocusDirective} from './focus.directive';
import {AutoFocusDirective} from './autofocus.directive';

@NgModule({
	declarations: [
		FocusDirective,
		AutoFocusDirective,
	],
	exports: [
		FocusDirective,
		AutoFocusDirective,
	],
	imports: [],
	providers: []
})
export class FocusModule {
}
