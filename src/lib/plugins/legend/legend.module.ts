import { NgModule } from '@angular/core';
import { LegendComponent } from './legend.component';
import { TemplateModule } from '../../template/template.module';

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
