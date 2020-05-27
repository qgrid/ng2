import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { GridPlugin } from '../plugin/grid-plugin';
import { RowState } from '@qgrid/core/row/row.state';
import { StateAccessor } from '../state/state-accessor';
import { TemplateHostService } from '../template/template-host.service';

@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content>',
	providers: [
		TemplateHostService,
		GridPlugin,
		StateAccessor,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements OnChanges {
	private rowAccessor = this.stateAccessor.setter(RowState);

	@Input('mode') set rowMode(mode: 'single' | 'multiple') { this.rowAccessor({ mode }); }
	@Input('unit') set rowUnit(unit: 'data' | 'details') { this.rowAccessor({ unit }); }
	@Input('canMove') set rowCanMove(canMove: boolean) { this.rowAccessor({ canMove }); }
	@Input('canResize') set rowCanResize(canResize: boolean) { this.rowAccessor({ canResize }); }
	@Input('height') set rowHeight(height) { this.rowAccessor({ height }); }

	constructor(
		private plugin: GridPlugin,
		private stateAccessor: StateAccessor,
		templateHost: TemplateHostService,
	) {
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}
}
