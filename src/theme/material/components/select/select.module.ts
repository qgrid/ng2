import { NgModule } from '@angular/core';
import { SelectDirective } from './select.directive';
import { MatSelectModule } from '@angular/material';

@NgModule({
	declarations: [SelectDirective],
	exports: [SelectDirective]
})
export class SelectModule {}
