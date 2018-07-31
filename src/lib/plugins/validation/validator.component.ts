import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ValidatorView } from 'ng2-qgrid/plugin/validation/validator.view';
import { PluginService } from '../plugin.service';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-validator',
	templateUrl: './validator.component.html',
	providers: [ TemplateHostService, PluginService ]
})
export class ValidatorComponent implements AfterViewInit {
	@Input() value: string;
	@Input() key: string;
	@Input() type: string;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;
	context: {};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService
	) {
		// this.templateHost.key = () => `validator`;
	}

	ngAfterViewInit() {
		const { model } = this.plugin;
		this.context = { $implicit: new ValidatorView(model, this) };
	}
}
