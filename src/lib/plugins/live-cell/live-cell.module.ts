import { NgModule } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { LiveCellComponent } from './live-cell.component';

@NgModule({
	declarations: [
		LiveCellComponent
	],
	exports: [
		LiveCellComponent
	],
	imports: [
		TemplateModule
	]
})
export class LiveCellModule {
}
