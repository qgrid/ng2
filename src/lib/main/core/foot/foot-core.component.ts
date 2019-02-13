import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewCoreService } from '../view/view-core.service';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TableCoreService } from '../table/table-core.service';
import { NgComponent } from '../../../infrastructure/component/ng.component';
import { RootService } from '../../../infrastructure/component/root.service';

@Component({
	selector: 'tfoot[q-grid-core-foot]',
	templateUrl: './foot-core.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FootCoreComponent extends NgComponent implements OnInit {
	constructor(
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private root: RootService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		const { model } = this.root;
		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				switch (e.state.status) {
					case 'stop':
						this.cd.detectChanges();
						break;
				}
			}
		}));
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
