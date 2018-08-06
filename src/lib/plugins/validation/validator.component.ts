import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ValidatorView } from 'ng2-qgrid/plugin/validation/validator.view';
import { PluginService } from '../plugin.service';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-validator',
	templateUrl: './validator.component.html',
	providers: [TemplateHostService, PluginService]
})
export class ValidatorComponent implements OnInit {
	@Input() value: string;
	@Input() key: string;
	@Input() type: string;
	context: { $implicit: ValidatorView };

	constructor(
		private plugin: PluginService,
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
