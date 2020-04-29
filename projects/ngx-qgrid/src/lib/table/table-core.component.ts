import { OnInit, Component, Input } from '@angular/core';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';
import { GridRoot } from '../grid/grid-root';
import { TableCoreService } from './table-core.service';
import { GridLet } from '../grid/grid-let';
@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [TableCoreService]
})
export class TableCoreComponent implements OnInit {
	@Input() pin = null;

	constructor(
		public $view: GridLet,
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

	get visibility(): VisibilityState {
		return this.root.model.visibility();
	}
}
