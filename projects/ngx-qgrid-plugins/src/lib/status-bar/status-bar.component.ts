import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { selectRowIndex, selectColumnIndex } from '@qgrid/core/navigation/navigation.state.selector';

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
		const { model, observe } = this.plugin;
		observe(model.navigationChanged)
			.subscribe(() => this.cd.detectChanges());
	}

	get rowIndex() {
		return selectRowIndex(this.plugin.model.navigation());
	}

	get columnIndex() {
		return selectColumnIndex(this.plugin.model.navigation());
	}
}
