import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { isUndefined } from '@qgrid/core';
import { GridError, GridEventArg, GridPlugin, TemplateHostService } from '@qgrid/ngx';

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
	@Input() trigger!: string;

	context: {
		[side in PaneSide]?: {
			$implicit: PaneComponent,
			value: any;
		} | null
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `plugin-pane-${source}.tpl.html`;

		this.context = {
			left: {
				$implicit: this,
				value: null
			},
			right: {
				$implicit: this,
				value: null
			}
		};
	}

	ngOnInit() {
		const { model, observeReply }: any = this.plugin;
		const scope = this.parse();
		if (scope) {
			const [state, prop] = scope;
			observeReply(model[`${state}Changed`])
				.subscribe((e: GridEventArg<any>) => {
					if (!prop || e.hasChanges(prop)) {
						this.open(DEFAULT_SIDE);
					}
				});
		}
	}

	open(side: PaneSide = DEFAULT_SIDE, value?: any) {
		const { table, model }: any = this.plugin;

		const scope = this.parse();
		if (scope && isUndefined(value)) {
			const [state, prop] = scope;
			value = model[state]()[prop];
		}

		this.context[side] = { $implicit: this, value };

		const paneLayer = `pane-${side}`;
		if (table.view.hasLayer(paneLayer)) {
			table.view.removeLayer(paneLayer);
		}
		table.view.addLayer(paneLayer);

		this.invalidate();
	}

	close(side: PaneSide = DEFAULT_SIDE) {
		const { table } = this.plugin;

		table.view.removeLayer(`pane-${side}`);

		this.context[side] = null;

		this.invalidate();
	}

	private invalidate(): void {
		this.cd.markForCheck();
		this.cd.detectChanges();
	}

	private parse() {
		const { model }: {
			[key: string]: any,
		} = this.plugin;
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
