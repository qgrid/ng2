import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../template/template-host.service';
import { GridPlugin } from '../plugin/grid-plugin';
import { RowState } from '@qgrid/core/row/row.state';

@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content>',
	providers: [
		TemplateHostService,
		GridPlugin
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent {
	private rowAccessor = this.plugin.stateAccessor(RowState);

	@Input('mode') set rowMode(mode: 'single' | 'multiple') { this.rowAccessor({ mode }); }
	@Input('unit') set rowUnit(unit: 'data' | 'details') { this.rowAccessor({ unit }); }
	@Input('canMove') set rowCanMove(canMove: boolean) { this.rowAccessor({ canMove }); }
	@Input('canResize') set rowCanResize(canResize: boolean) { this.rowAccessor({ canResize }); }
	@Input('height') set rowHeight(height) { this.rowAccessor({ height }); }

	constructor(
		private plugin: GridPlugin,
		templateHost: TemplateHostService,
	) {
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}
}
