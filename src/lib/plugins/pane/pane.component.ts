import { Component, OnInit } from '@angular/core';
import { PluginService } from '../plugin.service';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-pane',
	templateUrl: './pane.component.html',
	providers: [
		PluginService,
		TemplateHostService
	]
})
export class PaneComponent implements OnInit {
	constructor(private plugin: PluginService, templateHost: TemplateHostService) {
		templateHost.key = source => `plugin-pane-${source}.tpl.html`;
	}

	ngOnInit() {
		const { model } = this.plugin;
		model.selectionChanged.watch(e => {
			if (e.hasChanges('items')) {
				this.open('right');
			}
		});
	}

	open(side: 'right') {
		const { table } = this.plugin;
		table.view.addLayer(`pane-${side}`);
	}

	close(side: 'right') {
		const { table } = this.plugin;
		table.view.removeLayer(`pane-${side}`);
	}
}
