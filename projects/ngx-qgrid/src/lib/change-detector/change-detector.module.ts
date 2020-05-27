import { NgModule } from '@angular/core';
import { DirtyDirective } from './dirty.directive';

@NgModule({
	declarations: [
		DirtyDirective,
	],
	exports: [
		DirtyDirective,
	]
})
export class ChangeDetectorModule {
}
