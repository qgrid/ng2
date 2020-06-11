import { NgModule } from '@angular/core';
import { EventHostDirective } from './event-host.directive';

@NgModule({
	declarations: [
		EventHostDirective
	],
	exports: [
		EventHostDirective
	],
})
export class EventModule { }
