import {
	OnInit, Component, Input, HostListener, AfterViewInit, ApplicationRef, ChangeDetectorRef,
	EventEmitter, Output
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
	@Output() toggleScrollbarOpacity: EventEmitter<string> = new EventEmitter();

	config: PerfectScrollbarConfigInterface = {
		suppressScrollY: false,
		suppressScrollX: false
	};

	@HostListener('mouseenter') onMouseEnter() {
		this.toggleScrollbarOpacity.emit('reveal');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.toggleScrollbarOpacity.emit('hide');
	}

	constructor(private root: RootService, private table: TableCoreService, private cdRef: ChangeDetectorRef) {
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
