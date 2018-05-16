import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../../../template/template-host.service';

@Component({
	selector: 'q-grid-layer',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerComponent {
	constructor(private templateHost: TemplateHostService) {
		templateHost.key = source => `${source}-layer.tpl.html`;
	}
}
