import { NgModule } from '@angular/core';
import { RaiseDirective } from './raise.directive';

@NgModule({
	declarations: [
		RaiseDirective
	],
	exports: [
		RaiseDirective
	]
})
export class RaiseModule {
}
