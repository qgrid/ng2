import { Component } from '@angular/core';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { GridLet } from '../grid/grid-let';
import { TableCoreService } from '../table/table-core.service';

@Component({
	// tslint:disable-next-line
	selector: 'tfoot[q-grid-core-foot]',
	templateUrl: './foot-core.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class FootCoreComponent {
	constructor(
		public $view: GridLet,
		public $table: TableCoreService
	) {
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
