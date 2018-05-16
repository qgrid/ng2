import { OnInit, Component, Input } from '@angular/core';
import { RootService } from '../../../infrastructure/component/root.service';
import { TableCoreService } from './table-core.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [
		TableCoreService
	]
})
export class TableCoreComponent implements OnInit {
	@Input() public pin = null;

	constructor(private root: RootService, private table: TableCoreService) {
	}

	ngOnInit() {
		if (!this.pin) {
			this.pin = null;
		}

		this.table.pin = this.pin;
	}

	get visibility() {
		return this.model.visibility();
	}

	get model() {
		return this.root.model;
	}
}
