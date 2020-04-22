import { NgModule } from '@angular/core';
import { LegendComponent } from './legend.component';
import { TemplateModule as TemplateModule } from '@qgrid/ngx';

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
