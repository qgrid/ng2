import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateModule } from '@qgrid/ngx';
import { PipeModule } from '../pipes/pipe.module';
import { LiveCellComponent } from './live-cell.component';

@NgModule({
	declarations: [
		LiveCellComponent,
	],
	exports: [
		LiveCellComponent,
	],
	imports: [
		TemplateModule,
		CommonModule,
		PipeModule,
	],
})
export class LiveCellModule {
}
