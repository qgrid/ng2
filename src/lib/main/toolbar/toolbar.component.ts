import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-toolbar',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
	constructor(private templateHost: TemplateHostService) {
		templateHost.key = source => `${source}-toolbar.tpl.html`;
	}
}
