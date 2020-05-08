import { OnInit, Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TableCoreService } from './table-core.service';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';

@Component({
	selector: 'q-grid-core-table',
	templateUrl: './table-core.component.html',
	providers: [TableCoreService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCoreComponent implements OnInit {
	@Input() pin = null;

	constructor(
		public $view: GridLet,
		private plugin: GridPlugin,
		private tableService: TableCoreService,
		private cd: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		const { model, observe } = this.plugin;

		if (!this.pin) {
			this.pin = null;
		}

		this.tableService.pin = this.pin;

		observe(model.visibilityChanged)
			.subscribe(() => {
				this.cd.markForCheck();
				this.cd.detectChanges();
			});
	}

	get visibility(): VisibilityState {
		const { model } = this.plugin;
		return model.visibility();
	}
}
