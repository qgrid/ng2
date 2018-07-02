import { Component, OnInit, Optional } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-status-bar',
	templateUrl: './status-bar.component.html',
	providers: [TemplateHostService, PluginService]
})
export class StatusBarComponent {
	context: { $implicit: StatusBarComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, templateHost: TemplateHostService) {
		templateHost.key = () => 'plugin-status-bar.tpl.html';
	}

	get rowIndex() {
		return this.plugin.model.focus().rowIndex;
	}

	get columnIndex() {
		return this.plugin.model.focus().columnIndex;

	}
}
