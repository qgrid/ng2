import { NgModule } from '@angular/core';
import { FocusDirective } from './focus.directive';
import { AutoFocusDirective } from './autofocus.directive';
import { BlurDirective } from './blur.directive';

@NgModule({
	declarations: [
		FocusDirective,
		AutoFocusDirective,
		BlurDirective
	],
	exports: [
		FocusDirective,
		AutoFocusDirective,
		BlurDirective
	]
})
export class FocusModule {
}
