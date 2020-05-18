import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellHandlerComponent } from './cell-handler.component';
import { MarkupModule } from '../markup/markup.module';

@NgModule({
	declarations: [
		CellHandlerComponent,
	],
	exports: [
		CellHandlerComponent,
	],
	imports: [
		CommonModule,
	]
})
export class CellHandlerModule {
}
