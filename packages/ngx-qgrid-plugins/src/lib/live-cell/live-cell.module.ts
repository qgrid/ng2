import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from '@qgrid/ngx';
import { LiveCellComponent } from './live-cell.component';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
	declarations: [
		LiveCellComponent,
	],
	exports: [
		LiveCellComponent
	],
	imports: [
		TemplateModule,
		CommonModule,
		PipeModule
	]
})
export class LiveCellModule {
}
