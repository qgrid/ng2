import { OnInit, Component, Input } from '@angular/core';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TableCoreService } from './table-core.service';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [TableCoreService]
})
export class TableCoreComponent implements OnInit {
	@Input() pin = null;

	constructor(
		public $view: GridLet,
		private plugin: GridPlugin,
		private tableService: TableCoreService,
	) {
	}

	ngOnInit() {
		if (!this.pin) {
			this.pin = null;
		}

		this.tableService.pin = this.pin;
	}

	get visibility(): VisibilityState {
		return this.plugin.model.visibility();
	}
}
