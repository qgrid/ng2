import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../template/template-host.service';

@Component({
	selector: 'q-grid-toolbar',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
	constructor(templateHost: TemplateHostService) {
		templateHost.key = source => `toolbar-${source}.tpl.html`;
	}
}
