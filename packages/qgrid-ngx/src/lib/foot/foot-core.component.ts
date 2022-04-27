import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColumnView } from '@qgrid/core';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TableCoreService } from '../table/table-core.service';

@Component({
	selector: 'tfoot[q-grid-core-foot]', // eslint-disable-line @angular-eslint/component-selector
	templateUrl: './foot-core.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GridPlugin],
})
export class FootCoreComponent implements OnInit {
	constructor(
		public $view: GridLet,
		public $table: TableCoreService,
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		const { model, observe } = this.plugin;
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'push') {
					this.cd.markForCheck();
				}
			});
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
