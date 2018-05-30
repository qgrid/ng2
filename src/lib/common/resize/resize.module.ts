import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';
import { AutosizeDirective } from './autosize.directive';

@NgModule({
	declarations: [
		ResizeDirective,
		AutosizeDirective
	],
	exports: [
		ResizeDirective,
		AutosizeDirective
	]
})
export class ResizeModule {
}
