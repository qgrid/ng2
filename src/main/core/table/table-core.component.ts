import {OnInit, Component, Input} from '@angular/core';
import {RootService} from '@grid/infrastructure/component';
import {TableCoreService} from './table-core.service';

@Component({
	selector: 'q-grid-core-table',
	template: require('./table-core.component.html'),
	providers: [
		TableCoreService
	]
})
export class TableCoreComponent implements OnInit {
	@Input() public pin = null;

	constructor(private root: RootService,
					private table: TableCoreService) {
	}

	ngOnInit() {
		if (!this.pin) {
			this.pin = null;
		}

		this.table.pin = this.pin;
	}

	get columnStartIndex() {
		const columns = this.root.table.data.columns();
		switch (this.pin) {
			case 'left':
				return 0;
			case 'right':
				return columns.filter(c => c.pin !== 'right').length;
			default:
				return columns.filter(c => c.pin === 'left').length;
		}
	}

	get visibility() {
		return this.model.visibility();
	}

	get model() {
		return this.root.model;
	}
}
