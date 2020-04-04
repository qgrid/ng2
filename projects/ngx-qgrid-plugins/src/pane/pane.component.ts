import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { GridPlugin } from 'ngx-qgrid';
import { TemplateHostService, GridError } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-pane',
	templateUrl: './pane.component.html',
	providers: [
		GridPlugin,
		TemplateHostService
	]
})
export class PaneComponent implements OnInit {
	@Input() trigger: string;

	context: {
		$implicit: PaneComponent,
		value: any;
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `plugin-pane-${source}.tpl.html`;
	}

	ngOnInit() {
		const { model } = this.plugin;
		const scope = this.parse();
		if (scope) {
			const [state, prop] = scope;
			model[`${state}Changed`].watch(e => {
				if (!prop || e.hasChanges(prop)) {
					this.close('right');
					this.open('right');
				}
			});
		}
	}

	open(side: 'right') {
		const { table, model } = this.plugin;

		let value = null;
		const scope = this.parse();
		if (scope) {
			const [state, prop] = scope;
			value = model[state]()[prop];
		}

		this.context = { $implicit: this, value };
		this.cd.markForCheck();

		table.view.addLayer(`pane-${side}`);
	}

	close(side: 'right') {
		const { table } = this.plugin;

		table.view.removeLayer(`pane-${side}`);

		this.context = null;
		this.cd.markForCheck();
	}

	private parse() {
		const { model } = this.plugin;
		const parts = this.trigger ? this.trigger.split('.') : [];
		if (parts.length > 0) {
			const [state, prop] = parts;
			if (!model[state]) {
				throw new GridError('pane.component', `Trigger ${state} not found`);
			}

			return [state, prop];
		}

		return null;
	}
}
