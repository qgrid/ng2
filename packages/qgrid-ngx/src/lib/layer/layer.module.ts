import { NgModule } from '@angular/core';
import { LayerCoreComponent } from './layer-core.component';
import { LayerCoreDirective } from './layer-core.directive';
import { LayerComponent } from './layer.component';
import { TemplateModule } from '../template/template.module';

@NgModule({
	declarations: [
		LayerCoreComponent,
		LayerCoreDirective,
		LayerComponent,
	],
	exports: [
		LayerCoreComponent,
		LayerCoreDirective,
		LayerComponent,
	],
	imports: [
		TemplateModule
	]
})
export class LayerModule {
}
