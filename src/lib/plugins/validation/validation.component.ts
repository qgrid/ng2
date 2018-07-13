import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { PluginService } from '../plugin.service';
import { ValidatorView } from 'ng2-qgrid/plugin/validation/validator.view';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-validation',
	template: '',
	providers: [ TemplateHostService, PluginService ]
})
export class ValidationComponent implements AfterViewInit {
	@Input() type: string;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ValidationComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `validator`;
	}

	ngAfterViewInit() {
		const { model } = this.plugin;
		const validatorView = new ValidatorView(model, { type: this.type });
	}
}
