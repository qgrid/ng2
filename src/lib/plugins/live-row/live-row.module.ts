import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRowComponent } from './live-row.component';

@NgModule({
	declarations: [
		LiveRowComponent,
	],
	exports: [
		LiveRowComponent
	],
	imports: [
		CommonModule
	]
})
export class LiveRowModule {
}
