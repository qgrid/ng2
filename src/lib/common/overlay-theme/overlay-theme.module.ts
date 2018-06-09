import { NgModule } from '@angular/core';
import { OverlayThemeDirective } from './overlay-theme.directive';

@NgModule({
	declarations: [
		OverlayThemeDirective
	],
	exports: [
		OverlayThemeDirective
	]
})
export class OverlayThemeModule {
}
