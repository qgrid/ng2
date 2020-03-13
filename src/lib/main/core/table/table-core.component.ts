import { OnInit, Component, Input } from '@angular/core';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { RootService } from '../../../infrastructure/component/root.service';
import { TableCoreService } from './table-core.service';
import { ViewCoreService } from '../view/view-core.service';
@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [TableCoreService]
})
export class TableCoreComponent implements OnInit {
	@Input() pin = null;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
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
