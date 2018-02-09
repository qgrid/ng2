import {
	Directive,
	ViewContainerRef
} from '@angular/core';
import { LayerService } from './layer.service';

@Directive({
	selector: '[q-grid-core-layer]'
})
export class LayerCoreDirective {
	constructor(
		layerService: LayerService,
		viewContainerRef: ViewContainerRef
	) {
		layerService.init(viewContainerRef);
	}
}
