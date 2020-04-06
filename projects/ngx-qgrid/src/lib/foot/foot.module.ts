import { NgModule } from '@angular/core';
import { FootCoreComponent } from './foot-core.component';
import { TfCoreDirective } from './tf-core.directive';
import { RowModule } from '../row/row.module';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		FootCoreComponent,
		TfCoreDirective,
	],
	exports: [
		FootCoreComponent,
		TfCoreDirective,
	],
	imports: [
		CommonModule,
		RowModule
	]
})
export class FootModule {
}
