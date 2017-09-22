import { NgModule } from '@angular/core';
import { PositionDirective } from './position.directive';

@NgModule({
	declarations: [
		PositionDirective
	],
	exports: [
		PositionDirective
	],
	imports: [],
	providers: []
})
export class LayoutModule {
}
