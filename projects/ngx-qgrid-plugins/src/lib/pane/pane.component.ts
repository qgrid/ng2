import { Component, OnInit, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridPlugin, GridEventArg } from '@qgrid/ngx';
import { TemplateHostService, GridError } from '@qgrid/ngx';

export type PaneSide = 'left' | 'right';

@Component({
	selector: 'q-grid-pane',
	templateUrl: './pane.component.html',
	providers: [
		GridPlugin,
		TemplateHostService
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaneComponent implements OnInit {
	@Input() trigger: string;

	context: {
		[side in PaneSide]?: {
			$implicit: PaneComponent,
			value: any;
		}
	} = { };

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `plugin-pane-${source}.tpl.html`;
	}

	ngOnInit() {
		const { model, observeReply } = this.plugin;
		const scope = this.parse();
		if (scope) {
			const [state, prop] = scope;
			observeReply(model[`${state}Changed`])
				.subscribe((e: GridEventArg<any>) => {
					if (!prop || e.hasChanges(prop)) {
						this.updateAndOpen('right')
					}
				});
		}
	}

	open(side: PaneSide, value: any = null) {
		const { table, model } = this.plugin;

		const scope = this.parse();
		if (scope && !value) {
			const [state, prop] = scope;
			value = model[state]()[prop];
		}

		this.context[side] = { $implicit: this, value };
		table.view.addLayer(`pane-${side}`);

		this.invalidate();
	}

	close(side: PaneSide) {
		const { table } = this.plugin;

		table.view.removeLayer(`pane-${side}`);

		this.context[side] = null;

		this.invalidate();
	}

	updateAndOpen(side: PaneSide, value: any = null) {
		this.close(side);
		this.open(side, value);
	}

	private invalidate(): void {
		this.cd.markForCheck();
		this.cd.detectChanges();
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
