import { NgModule } from '@angular/core';
import { SelectDirective } from './select.directive';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [SelectDirective],
	exports: [SelectDirective]
})
export class SelectModule {}
