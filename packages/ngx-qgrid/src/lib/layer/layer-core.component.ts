import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'q-grid-core-layer',
	templateUrl: './layer-core.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerCoreComponent {
	@HostBinding('class')
	hostClass = 'q-grid-layer';
}
