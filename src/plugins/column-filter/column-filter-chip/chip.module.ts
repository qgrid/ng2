import { NgModule } from '@angular/core';
import { ChipComponent } from 'ng2-qgrid/plugins/column-filter/column-filter-chip/chip.component';
import {TemplateModule} from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		ChipComponent
	],
	exports: [
		ChipComponent
	],
	imports: [
		TemplateModule
	]
})
export class ChipModule { }
