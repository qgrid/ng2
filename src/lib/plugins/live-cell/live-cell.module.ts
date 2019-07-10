import { NgModule, } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { LiveCellComponent } from './live-cell.component';
import { LiveCellUpdateComponent } from './live-cell-update.component';

@NgModule({
	declarations: [
		LiveCellComponent,
		LiveCellUpdateComponent,
	],
	exports: [
		LiveCellComponent,
		LiveCellUpdateComponent
	],
	imports: [
		TemplateModule,
	]
})
export class LiveCellModule {
}
