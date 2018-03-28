import { Component, OnInit, Optional } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-status-bar',
	templateUrl: './status-bar.component.html',
	providers: [TemplateHostService]
})
export class StatusBarComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService, templateHost: TemplateHostService) {
		super(root);

		templateHost.key = () => `plugin-status-bar.tpl.html`;
	}

	private rowIndex = 0;
	private columnIndex = 0;

	ngOnInit() {
		const focus = this.model.focus();

		this.using(this.model.focusChanged.on(() => {
			this.rowIndex = focus.rowIndex;
			this.columnIndex = focus.columnIndex;
		}));
	}
}
