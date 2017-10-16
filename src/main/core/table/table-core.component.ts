import {
	OnInit, Component, Input, Output, ViewChild, ElementRef, ContentChild, AfterViewInit,
	HostBinding, HostListener
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { TableCoreService } from './table-core.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [
		TableCoreService
	]
})
export class TableCoreComponent implements OnInit {
	@Input() public pin = null;
	@Input() disableScrollY: boolean = false;

	private config: PerfectScrollbarConfigInterface = {
		suppressScrollY: false,
		suppressScrollX: false
	};

	constructor(private root: RootService, private table: TableCoreService) {
	}

	ngOnInit() {
		if (!this.pin) {
			this.pin = null;
		}

		this.table.pin = this.pin;

		this.config.suppressScrollY = this.disableScrollY;
	}

	get visibility() {
		return this.model.visibility();
	}

	get model() {
		return this.root.model;
	}
}
