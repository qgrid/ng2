import { Component, Input, OnInit } from '@angular/core';
import { ValidatorView } from 'qgrid/plugins/validation/validator.view';
import { GridPlugin, TemplateHostService } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-validator',
	templateUrl: './validator.component.html',
	providers: [TemplateHostService, GridPlugin]
})
export class ValidatorComponent implements OnInit {
	@Input() value: string;
	@Input() key: string;
	@Input() type: string;
	context: { $implicit: ValidatorView };

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `validator`;
	}

	ngOnInit() {
		const { model } = this.plugin;
		const view = new ValidatorView(model, this);
		this.context = { $implicit: view };
	}
}
