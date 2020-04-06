import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-layer',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerComponent {
	constructor(templateHost: TemplateHostService) {
		templateHost.key = source => `layer-${source}.tpl.html`;
	}
}
