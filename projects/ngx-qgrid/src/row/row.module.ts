import { NgModule } from '@angular/core';
import { RowComponent } from './row.component';
import { TrCoreDirective } from './tr-core.directive';
import { TrhCoreDirective } from './trh-core.directive';

@NgModule({
	declarations: [
		RowComponent,
		TrCoreDirective,
		TrhCoreDirective,
	],
	exports: [
		RowComponent,
		TrCoreDirective,
		TrhCoreDirective,
	],
})
export class RowModule {
}
