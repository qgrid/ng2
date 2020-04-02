import { NgModule } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { LayerComponent } from './layer.component';

@NgModule({
	declarations: [
		LayerComponent
	],
	exports: [
		LayerComponent
	],
	imports: [
		TemplateModule
	]
})
export class LayerModule {
}
