import { NgModule } from '@angular/core';
import { SelectDirective } from './select.directive';
import { MatSelectModule } from '@angular/material';
import { SelectTriggerDirective } from './select-trigger.directive';

@NgModule({
	declarations: [SelectDirective, SelectTriggerDirective],
	exports: [SelectDirective, SelectTriggerDirective]
})
export class SelectModule {}
