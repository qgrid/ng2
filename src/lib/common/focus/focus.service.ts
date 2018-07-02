import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { FocusAfterRender as FocusAfterRenderCore } from 'ng2-qgrid/core/focus/focus.service';
import { PluginService } from '../../plugins/plugin.service';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private focus: FocusAfterRenderCore;

	constructor(
		@Optional() plugin: PluginService,
		@Optional() root: RootService
	) {
		const gridModel = (plugin && plugin.model) || (root && root.model);
		const domTable = (plugin && plugin.table)  || (root && root.table);
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
