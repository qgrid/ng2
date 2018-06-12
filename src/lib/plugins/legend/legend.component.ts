import { Component, OnInit, Optional, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-legend',
	templateUrl: './legend.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TemplateHostService]
})
export class LegendComponent {
	context: { $implicit: LegendComponent } = {
		$implicit: this
	};

	constructor(templateHost: TemplateHostService) {
		templateHost.key = () => 'plugin-legend-core.tpl.html';
	}
}
