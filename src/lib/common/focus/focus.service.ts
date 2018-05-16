import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';

@Injectable()
export class FocusAfterRender implements OnDestroy {
	private off;

	constructor(@Optional() root: RootService) {
		if (root) {
			this.off = root.model.sceneChanged.on((e, off) => {
				if (e.state.status === 'stop') {
					root.table.view.focus();
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
