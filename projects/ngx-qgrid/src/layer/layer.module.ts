import { NgModule } from '@angular/core';
import { LayerCoreComponent } from './layer-core.component';
import { LayerCoreDirective } from './layer-core.directive';

@NgModule({
	declarations: [
		LayerCoreComponent,
		LayerCoreDirective
	],
	exports: [
		LayerCoreComponent,
		LayerCoreDirective
	],
})
export class LayerModule {
}
