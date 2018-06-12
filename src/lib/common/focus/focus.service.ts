import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private off;

	constructor(
		@Optional() model: Model,
		@Optional() table: Table,
		@Optional() root: RootService
	) {
		const gridModel = model || (root && root.model);
		const domTable = table || (root && root.table);
		if (gridModel && domTable) {
			this.off = gridModel.sceneChanged.on((e, off) => {
				if (e.state.status === 'stop') {
					domTable.view.focus();
					off();
					this.off = null;
				}
			});
		}
	}

	ngOnDestroy() {
		if (this.off) {
			this.off();
			this.off = null;
		}
	}
}
