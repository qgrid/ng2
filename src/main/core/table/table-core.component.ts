import {OnInit, Component, Input, HostListener, ViewChild} from '@angular/core';
import {RootService} from 'ng2-qgrid/infrastructure/component';
import {TableCoreService} from './table-core.service';
import {Model} from 'ng2-qgrid/core/infrastructure/model';
import {VisibilityModel} from 'ng2-qgrid/core/visibility/visibility.model';

import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [
		TableCoreService
	]
})
export class TableCoreComponent implements OnInit {
	@Input() public pin = null;

	@ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

	@HostListener('mouseenter') onMouseEnter() {
		this.directiveScroll.scrollToY(0.01, 0.01);
		this.onMouseEnter = null;
	}

	constructor(private root: RootService, private table: TableCoreService) {
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
