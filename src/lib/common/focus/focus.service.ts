import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { FocusAfterRender as FocusAfterRenderCore } from 'ng2-qgrid/core/focus/focus.service';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private focus: FocusAfterRenderCore;

	constructor(
		@Optional() model: Model,
		@Optional() table: Table,
		@Optional() root: RootService
	) {
		const gridModel = model || (root && root.model);
		const domTable = table || (root && root.table);
		if (gridModel && domTable) {
			this.focus = new FocusAfterRenderCore(gridModel, domTable);
		}
	}

	ngOnDestroy() {
		if (this.focus) {
			this.focus.dispose();
			this.focus = null;
		}
	}
}
