import { NgModule } from '@angular/core';
import { MenuDirective } from './menu.directive';

@NgModule({
	declarations: [
		MenuDirective
	],
	exports: [
		MenuDirective
	]
})
export class MenuModule {
}
