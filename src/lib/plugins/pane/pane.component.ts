import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { PluginService } from '../plugin.service';
import { TemplateHostService } from '../../template/template-host.service';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Component({
	selector: 'q-grid-pane',
	templateUrl: './pane.component.html',
	providers: [
		PluginService,
		TemplateHostService
	]
})
export class PaneComponent implements OnInit {
	@Input() trigger: string;

	context: {
		$implicit: PaneComponent,
		cell: {
			rowIndex: number,
			columnIndex: number,
			row: any,
			column: any
		};
	};

	constructor(
		private plugin: PluginService,
		private cd: ChangeDetectorRef,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `plugin-pane-${source}.tpl.html`;
	}

	ngOnInit() {
		const { model } = this.plugin;
		const parts = this.trigger ? this.trigger.split('.') : [];
		if (parts.length > 0) {
			const [state, prop] = parts;
			if (!model[state]) {
				throw new AppError('pane.component', `Trigger ${state} not found`);
			}

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

		this.context = {
			$implicit: this,
			cell: model.navigation().cell
		};

		this.cd.markForCheck();
		table.view.addLayer(`pane-${side}`);
	}

	close(side: 'right') {
		const { table } = this.plugin;

		table.view.removeLayer(`pane-${side}`);

		this.context = null;
		this.cd.markForCheck();
	}
}
