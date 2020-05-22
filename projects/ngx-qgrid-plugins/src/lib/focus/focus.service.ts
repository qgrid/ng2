import { Injectable, OnDestroy, Optional } from '@angular/core';
import { FocusAfterRenderService } from '@qgrid/core/focus/focus.service';
import { GridPlugin, Disposable, GridRoot } from '@qgrid/ngx';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private disposable = new Disposable();

	constructor(
		@Optional() plugin: GridPlugin,
		@Optional() root: GridRoot
	) {
		const gridModel = (plugin && plugin.model) || (root && root.model);
		const domTable = (plugin && plugin.table) || (root && root.table);
		if (gridModel && domTable) {
			const focus = new FocusAfterRenderService(
				gridModel,
				domTable,
				this.disposable
			);
		}
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
