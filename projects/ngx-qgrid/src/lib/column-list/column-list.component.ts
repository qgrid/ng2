import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColumnListService } from './column-list.service';
import { GridPlugin } from '../plugin/grid-plugin';
import { ColumnListState } from '@qgrid/core/column-list/column.list.state';

@Component({
	selector: 'q-grid-columns',
	template: '<ng-content></ng-content>',
	providers: [ColumnListService, GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnListComponent {
	private columnListAccessor = this.plugin.stateAccessor(ColumnListState);

	@Input('generation') set columnListGeneration(generation) { this.columnListAccessor({ generation }); }

	constructor(private plugin: GridPlugin) {
	}
}
