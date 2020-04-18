import { Component, Input, OnInit } from '@angular/core';
import { ValidatorPlugin } from '@qgrid/plugins/validation/validator.plugin';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-validator',
	templateUrl: './validator.component.html',
	providers: [TemplateHostService, GridPlugin]
})
export class ValidatorComponent implements OnInit {
	@Input() value: string;
	@Input() key: string;
	@Input() type: string;
	context: { $implicit: ValidatorPlugin };

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `validator`;
	}

	ngOnInit() {
		const { model } = this.plugin;
		const validator = new ValidatorPlugin(model, this);
		this.context = { $implicit: validator };
	}
}
