import { OnInit, Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { RootService } from '../../../infrastructure/component/root.service';
import { TableCoreService } from './table-core.service';
import { ViewCoreService } from '../view/view-core.service';
import { NgComponent } from '../../../infrastructure/component/ng.component';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [
		TableCoreService
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCoreComponent extends NgComponent implements OnInit {
	@Input() public pin = null;

	constructor(
		public $view: ViewCoreService,
		private cd: ChangeDetectorRef,
		private root: RootService,
		private table: TableCoreService,
	) {
		super();
	}

	ngOnInit() {
		const { model } = this.root;

		if (!this.pin) {
			this.pin = null;
		}

		this.table.pin = this.pin;
		this.using(model.visibilityChanged.watch(e => {
			this.cd.detectChanges();
		}));

	}

	get visibility(): VisibilityModel {
		return this.root.model.visibility();
	}
}
