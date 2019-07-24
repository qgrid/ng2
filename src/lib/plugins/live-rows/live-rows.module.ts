import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRowsComponent } from './live-rows.component';

@NgModule({
	declarations: [
		LiveRowsComponent,
	],
	exports: [
		LiveRowsComponent
	],
	imports: [
		CommonModule
	]
})
export class LiveRowsModule {
}
