import { NgModule } from '@angular/core';
import { LegendComponent } from './legend.component';
import { TemplateModule as TemplateModule } from 'ngx-qgrid';

@NgModule({
	declarations: [
		LegendComponent
	],
	exports: [
		LegendComponent
	],
	imports: [
		TemplateModule
	]
})
export class LegendModule {
}
