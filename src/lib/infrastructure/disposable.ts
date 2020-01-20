import { Injectable, OnDestroy } from '@angular/core';
import { Disposable as DisposableCore } from 'ng2-qgrid/core/infrastructure/disposable'

@Injectable()
export class Disposable implements OnDestroy {
	private core = new DisposableCore();

	add(resource: () => void) {
		return this.core.using(resource);
	}

	finalize() {
		this.core.dispose();
	}

	ngOnDestroy() {
		this.finalize();
	}
}
