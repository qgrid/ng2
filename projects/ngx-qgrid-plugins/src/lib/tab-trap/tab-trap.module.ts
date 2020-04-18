import { NgModule } from '@angular/core';
import { TabTrapComponent } from './tab-trap.component';
import { TemplateModule } from '@qgrid/ngx';
import { TabTrapInDirective } from './tab-trap-in.directive';

@NgModule({
	declarations: [
		TabTrapComponent,
		TabTrapInDirective
	],
	exports: [
		TabTrapComponent,
		TabTrapInDirective
	],
	imports: [
		TemplateModule
	]
})
export class TabTrapModule {
}
