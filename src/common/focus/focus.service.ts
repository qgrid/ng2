import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private off;

	constructor(@Optional() root: RootService) {
		this.off = root.model.sceneChanged.on(e => {
			if (e.state.status === 'stop') {
				root.table.view.focus();
			}
		});
	}

	ngOnDestroy() {
		this.off();
	}
}
