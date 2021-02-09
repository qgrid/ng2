import { Component, OnInit, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { isUndefined } from '@qgrid/core/utility/kit';
import { GridPlugin, GridEventArg } from '@qgrid/ngx';
import { TemplateHostService, GridError } from '@qgrid/ngx';

type PaneSide = 'left' | 'right';
const DEFAULT_SIDE: PaneSide = 'right';

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
						this.updateAndOpen(DEFAULT_SIDE)
					}
				});
		}
	}

	open(side: PaneSide = DEFAULT_SIDE, value?: any) {
		const { table, model } = this.plugin;

		const scope = this.parse();
		if (scope && isUndefined(value)) {
			const [state, prop] = scope;
			value = model[state]()[prop];
		}

		this.context[side] = { $implicit: this, value };
		table.view.addLayer(`pane-${side}`);

		this.invalidate();
	}

	close(side: PaneSide = DEFAULT_SIDE) {
		const { table } = this.plugin;

		table.view.removeLayer(`pane-${side}`);

		this.context[side] = null;

		this.invalidate();
	}

	updateAndOpen(side: PaneSide = DEFAULT_SIDE, value?: any) {
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
