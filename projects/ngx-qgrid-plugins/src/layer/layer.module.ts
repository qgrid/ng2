import { NgModule } from '@angular/core';
import { TemplateModule } from 'ngx-qgrid';
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
