import { Component } from '@angular/core';
import { ViewCoreService } from '../view/view-core.service';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TableCoreService } from '../table/table-core.service';

@Component({
	selector: 'tfoot[q-grid-core-foot]',
	templateUrl: './foot-core.component.html'
})
export class FootCoreComponent {
	constructor(public $view: ViewCoreService, public $table: TableCoreService) {
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
