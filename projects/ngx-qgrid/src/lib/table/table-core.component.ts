import { OnInit, Component, Input } from '@angular/core';
import { VisibilityModel } from '@qgrid/core/visibility/visibility.model';
import { GridRoot } from '../grid/grid-root';
import { TableCoreService } from './table-core.service';
import { GridView } from '../grid/grid-view';
@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [TableCoreService]
})
export class TableCoreComponent implements OnInit {
	@Input() pin = null;

	constructor(
		public $view: GridView,
		private root: GridRoot,
		private table: TableCoreService,
	) {
	}

	ngOnInit() {
		if (!this.pin) {
			this.pin = null;
		}

		this.table.pin = this.pin;
	}

	get visibility(): VisibilityModel {
		return this.root.model.visibility();
	}
}
