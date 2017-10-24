import { Component, OnInit } from '@angular/core';
import { TemplateHostService } from 'ng2-qgrid/template';

@Component({
	selector: 'q-grid-toolbar',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService]
})
export class ToolbarComponent implements OnInit {
	constructor(private templateHost: TemplateHostService) {
		templateHost.key = source => `${source}-toolbar.tpl.html`;
	}

	ngOnInit() {
	}
}
