import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'q-grid-core-layer',
	templateUrl: './layer-core.component.html'
})
export class LayerCoreComponent {
	@HostBinding('class')
	hostClass = 'q-grid-layer';
}
