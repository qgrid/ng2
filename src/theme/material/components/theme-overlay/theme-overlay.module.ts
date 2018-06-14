import { NgModule } from '@angular/core';
import { ThemeOverlayDirective } from './theme-overlay.directive';

@NgModule({
	declarations: [
		ThemeOverlayDirective
	],
	exports: [
		ThemeOverlayDirective
	]
})
export class ThemeOverlayModule {
}
