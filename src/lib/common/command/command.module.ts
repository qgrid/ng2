import { NgModule } from '@angular/core';
import { CommandDirective } from './command.directive';

@NgModule({
	declarations: [
		CommandDirective
	],
	exports: [
		CommandDirective
	]
})
export class CommandModule {
}
