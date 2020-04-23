import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-status-bar',
	templateUrl: './status-bar.component.html',
	providers: [TemplateHostService, GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBarComponent implements OnInit {
	context: { $implicit: StatusBarComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		templateHost: TemplateHostService) {
		templateHost.key = () => 'plugin-status-bar.tpl.html';
	}

	ngOnInit() {
		const { model } = this.plugin;
		model.focusChanged.on(() => this.cd.detectChanges());
	}

	get rowIndex() {
		return this.plugin.model.focus().rowIndex;
	}

	get columnIndex() {
		return this.plugin.model.focus().columnIndex;
	}
}
