import { NgModule } from '@angular/core';
import { PositionDirective } from './position.directive';

@NgModule({
	declarations: [
		PositionDirective,
	],
	exports: [
		PositionDirective,
	]
})
export class LayoutModule {
}
