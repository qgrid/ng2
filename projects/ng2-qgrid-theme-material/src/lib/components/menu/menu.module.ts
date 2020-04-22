import { NgModule } from '@angular/core';
import { MenuDirective } from './menu.directive';
import { MenuTriggerDirective } from './menu-trigger.directive';

@NgModule({
	declarations: [MenuDirective, MenuTriggerDirective],
	exports: [MenuDirective, MenuTriggerDirective]
})
export class MenuModule {}
