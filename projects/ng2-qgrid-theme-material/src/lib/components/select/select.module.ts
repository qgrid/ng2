import { NgModule } from '@angular/core';
import { SelectDirective } from './select.directive';

@NgModule({
	declarations: [SelectDirective],
	exports: [SelectDirective]
})
export class SelectModule {}
