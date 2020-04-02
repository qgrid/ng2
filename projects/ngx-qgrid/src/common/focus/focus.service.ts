import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { FocusAfterRenderService } from 'ng2-qgrid/core/focus/focus.service';
import { PluginService } from 'ngx-qgrid/plugins/plugin.service';
import { Disposable } from '../../infrastructure/disposable';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private disposable = new Disposable();

	constructor(
		@Optional() plugin: PluginService,
		@Optional() root: RootService
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
