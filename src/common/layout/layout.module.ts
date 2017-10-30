import { NgModule } from '@angular/core';
import { PositionDirective } from './position.directive';
import { StopPropagateDirective } from './stop-propagate.directive';

@NgModule({
	declarations: [
		PositionDirective,
		StopPropagateDirective
	],
	exports: [
		PositionDirective,
		StopPropagateDirective
	],
	imports: [],
	providers: []
})
export class LayoutModule {
}
