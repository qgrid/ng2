import {Component} from '@angular/core';
import {ViewCoreService} from '../view/view-core.service';
import {ColumnView} from 'ng2-qgrid/core/scene/view/column.view';

@Component({
	selector: 'thead[q-grid-core-head]',
	templateUrl: './head-core.component.html'
})
export class HeadCoreComponent {
	constructor(public $view: ViewCoreService) {
	}

	columnKey(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowIndex(index: number) {
		return index;
	}
}
