import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';
import { AutoSizeDirective } from './autosize.directive';

@NgModule({
	declarations: [
		ResizeDirective,
		AutoSizeDirective
	],
	exports: [
		ResizeDirective,
		AutoSizeDirective
	]
})
export class ResizeModule {
}
