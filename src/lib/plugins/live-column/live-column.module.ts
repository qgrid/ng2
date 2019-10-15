import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveColumnComponent } from './live-column.component';

@NgModule({
	declarations: [
		LiveColumnComponent
	],
	exports: [
		LiveColumnComponent
	],
	imports: [
		CommonModule
	]
})
export class LiveColumnModule {
}
